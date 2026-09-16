import { test, mock } from 'node:test'
import assert from 'node:assert/strict'
import { managementToken, managementId, emailPreferenceUrl } from '../src/lib/emailTokens'
import { POST } from '../src/app/api/email/preferences/route'
import { GET } from '../src/app/api/cron/email/route'
import * as lifecycle from '../src/lib/emailLifecycle'

test('management links resist tampering and keep credentials out of request URLs',()=>{
  const prior=process.env.EMAIL_TOKEN_SECRET;process.env.EMAIL_TOKEN_SECRET='test-key-not-production-12345678901234567890'
  try {const id='11111111-1111-4111-8111-111111111111';const token=managementToken(id);assert.equal(managementId(token),id);assert.equal(managementId(token+'x'),null);const url=new URL(emailPreferenceUrl('manage',token));assert.equal(url.search,'');assert.ok(url.hash.includes(token))} finally {if(prior)process.env.EMAIL_TOKEN_SECRET=prior;else delete process.env.EMAIL_TOKEN_SECRET}
})
test('opening the preferences page only inspects; confirmation requires explicit POST action',async()=>{
  const inspect=mock.method(lifecycle,'inspectEmailPreferences',async()=>({kind:'verify' as const,confirmed:false,reminder:true,marketing:false,dueAt:new Date().toISOString()}))
  const confirm=mock.method(lifecycle,'confirmEmailPreferences',async()=>({confirmed:true}))
  const request=(action:string)=>new Request('https://example.invalid/api/email/preferences',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind:'verify',token:'x'.repeat(43),action})})
  try {assert.equal((await POST(request('inspect'))).status,200);assert.equal(confirm.mock.callCount(),0);assert.equal((await POST(request('confirm'))).status,200);assert.equal(confirm.mock.callCount(),1)}finally{inspect.mock.restore();confirm.mock.restore()}
})
test('cron refuses missing or incorrect credentials even if configuration is absent',async()=>{
  const prior=process.env.CRON_SECRET;delete process.env.CRON_SECRET
  try {assert.equal((await GET(new Request('https://example.invalid/api/cron/email'))).status,401);process.env.CRON_SECRET='test-secret';assert.equal((await GET(new Request('https://example.invalid/api/cron/email',{headers:{authorization:'Bearer wrong'}}))).status,401)}finally{if(prior)process.env.CRON_SECRET=prior;else delete process.env.CRON_SECRET}
})
