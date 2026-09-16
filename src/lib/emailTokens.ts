import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
export const EMAIL_SITE = 'https://www.iamneilgreene.com'
function secret() { const value = process.env.EMAIL_TOKEN_SECRET; if (!value || value.length < 32) throw new Error('Email preferences unavailable'); return value }
export const hashEmailToken = (token: string) => createHash('sha256').update(token).digest('hex')
export const newEmailToken = () => randomBytes(32).toString('base64url')
export function managementToken(id: string) { return `${id}.${createHmac('sha256', secret()).update(`manage:${id}`).digest('base64url')}` }
export function managementId(token: string): string | null {
  const [id] = token.split('.')
  if (!/^[0-9a-f-]{36}$/.test(id)) return null
  const expected = Buffer.from(managementToken(id)); const actual = Buffer.from(token)
  return expected.length === actual.length && timingSafeEqual(expected, actual) ? id : null
}
export function emailPreferenceUrl(kind: 'verify' | 'manage', token: string) { return `${EMAIL_SITE}/email-preferences#${kind}=${encodeURIComponent(token)}` }
export function privateRateKey(value: string) { return createHmac('sha256', secret()).update(`rate:${value}`).digest('hex') }
