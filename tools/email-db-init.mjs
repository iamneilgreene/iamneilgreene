import nextEnv from '@next/env'
import postgres from 'postgres'
import { readFile } from 'node:fs/promises'
nextEnv.loadEnvConfig(process.cwd())
const url = process.env.EMAIL_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) { console.error('Configure the private email database URL first.'); process.exit(1) }
const sql = postgres(url, { ssl: { rejectUnauthorized: true }, max: 1, connect_timeout: 8, prepare: false, onnotice: () => {} })
try {
  await sql.unsafe(await readFile(new URL('../db/001_email_lifecycle.sql', import.meta.url), 'utf8'))
  const tables = await sql`select table_name from information_schema.tables where table_schema='public' and table_name in ('ng_email_contacts','ng_email_requests','ng_email_reminders','ng_email_rate_limits') order by table_name`
  if (tables.length !== 4) throw new Error('Schema verification failed')
  console.log('Verified the four private email lifecycle tables.')
} catch { console.error('Email database setup failed. No credentials or provider response bodies were logged.'); process.exitCode = 1 }
finally { await sql.end() }
