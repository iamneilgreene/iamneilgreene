import postgres from 'postgres'
let connection: ReturnType<typeof postgres> | undefined
export function isEmailDbConfigured() {
  return Boolean((process.env.EMAIL_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL) && process.env.EMAIL_TOKEN_SECRET)
}
export function emailDb() {
  const url = process.env.EMAIL_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!url || !process.env.EMAIL_TOKEN_SECRET) throw new Error('Email preferences unavailable')
  connection ??= postgres(url, { ssl: { rejectUnauthorized: true }, max: 3, idle_timeout: 20, connect_timeout: 8, prepare: false, onnotice: () => {}, connection: { statement_timeout: 10000, idle_in_transaction_session_timeout: 60000 } })
  return connection
}
