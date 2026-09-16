import { test, mock } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import postgres from 'postgres'
import * as database from '../src/lib/emailDb'
import * as mail from '../src/lib/mail'
import { requestEmailPreferences, inspectEmailPreferences, confirmEmailPreferences, reduceEmailPreferences, limitEmailRequest } from '../src/lib/emailLifecycle'
import { runEmailJobs } from '../src/lib/emailJobs'
import { hashEmailToken } from '../src/lib/emailTokens'

const url=process.env.EMAIL_TEST_DATABASE_URL
const token=(url:string,kind:string)=>new URLSearchParams(new URL(url).hash.slice(1)).get(kind)!
test('real Postgres: confirmation, withdrawal, expiry, concurrent limits and reminder dispatch', {skip:!url},async()=>{
  assert.equal(new URL(url!).hostname,'127.0.0.1')
  assert.equal(new URL(url!).pathname,'/ng_email_test')
  const sql=postgres(url!,{ssl:false,max:5,prepare:false,onnotice:()=>{}})
  const oldEnv={...process.env};process.env.EMAIL_TOKEN_SECRET='isolated-integration-test-secret-1234567890';delete process.env.TWENTY_CRM_API_KEY;delete process.env.VERCEL
  const db=mock.method(database,'emailDb',()=>sql)
  let sent=0
  const send=mock.method(mail,'sendWebsiteMail',async()=>{sent++;return{accepted:true as const}})
  try {
    const migration = await sql.reserve()
    try { await migration.unsafe(readFileSync('db/001_email_lifecycle.sql','utf8')) } finally { migration.release() }
    await sql`truncate ng_email_contacts,ng_email_requests,ng_email_reminders,ng_email_rate_limits cascade`
    const links=await requestEmailPreferences({name:'Integration Test',email:'integration@example.invalid',reminder:true,marketing:true})
    const verify=token(links.verificationUrl,'verify'), manage=token(links.managementUrl,'manage')
    assert.equal((await inspectEmailPreferences('verify',verify))?.confirmed,false)
    assert.equal((await sql`select * from ng_email_reminders`).length,0)
    await Promise.all([confirmEmailPreferences(verify),confirmEmailPreferences(verify)])
    assert.equal((await sql`select * from ng_email_reminders where status='pending'`).length,1)
    assert.equal((await inspectEmailPreferences('manage',manage))?.marketing,true)
    await reduceEmailPreferences(manage,'cancel-reminder')
    assert.equal((await inspectEmailPreferences('manage',manage))?.marketing,true)
    assert.equal((await inspectEmailPreferences('manage',manage))?.reminder,false)
    assert.equal(await confirmEmailPreferences(verify),null)
    await reduceEmailPreferences(manage,'unsubscribe')
    assert.equal((await inspectEmailPreferences('manage',manage))?.marketing,false)
    const expired=await requestEmailPreferences({name:'Expired Test',email:'expiry@example.invalid',reminder:true,marketing:false})
    const expiredToken=token(expired.verificationUrl,'verify')
    await sql`update ng_email_requests set expires_at=now()-interval '1 second' where token_hash=${hashEmailToken(expiredToken)}`
    assert.equal(await confirmEmailPreferences(expiredToken),null)
    const newRequest=await requestEmailPreferences({name:'Integration Test',email:'integration@example.invalid',reminder:true,marketing:false})
    await confirmEmailPreferences(token(newRequest.verificationUrl,'verify'))
    await sql`update ng_email_reminders set due_at=now()-interval '1 minute' where status='pending'`
    await Promise.all([runEmailJobs(),runEmailJobs()])
    assert.equal(sent,1)
    assert.equal((await sql`select * from ng_email_reminders where status='accepted'`).length,1)
    await runEmailJobs();assert.equal(sent,1)
    const uncertain=await requestEmailPreferences({name:'Uncertain Test',email:'uncertain@example.invalid',reminder:true,marketing:false})
    await confirmEmailPreferences(token(uncertain.verificationUrl,'verify'))
    await sql`update ng_email_reminders set due_at=now()-interval '1 minute' where status='pending'`
    send.mock.mockImplementation(async()=>{sent++;throw new Error('Ambiguous SMTP timeout')})
    await runEmailJobs();await runEmailJobs()
    assert.equal(sent,2)
    assert.equal((await sql`select * from ng_email_reminders where status='uncertain'`).length,1)
    const attempts=await Promise.all(Array.from({length:5},()=>limitEmailRequest(new Request('http://127.0.0.1'),'limit@example.invalid','profile')))
    assert.equal(attempts.filter(Boolean).length,1)
    const contacts=await sql`select * from ng_email_contacts`
    assert.ok(contacts.every(c=>!('scores' in c)&&!('answers' in c)))
  } finally {send.mock.restore();db.mock.restore();process.env=oldEnv;await sql.end()}
})
