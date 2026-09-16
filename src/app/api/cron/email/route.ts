import { timingSafeEqual } from 'node:crypto'
import { emailJson } from '../../../../lib/emailHttp'
import { runEmailJobs } from '../../../../lib/emailJobs'
export const runtime = 'nodejs'
export const maxDuration = 300
export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET ? Buffer.from(`Bearer ${process.env.CRON_SECRET}`) : null
  const actual = Buffer.from(request.headers.get('authorization') || '')
  if (!expected || expected.length !== actual.length || !timingSafeEqual(expected, actual)) return emailJson({ error: 'Unauthorized' }, 401)
  try { return emailJson(await runEmailJobs()) }
  catch { console.error('email_jobs_unavailable'); return emailJson({ error: 'Email jobs unavailable' }, 503) }
}
