import { createHash } from 'node:crypto'

// Best-effort per-process burst protection. Instances do not share this map;
// durable cross-instance limits belong in the edge firewall or a shared store.
const attempts = new Map<string, number>()
export function claimProfileEmail(email: string, now = Date.now()): boolean {
  for (const [key, timestamp] of attempts) if (now - timestamp >= 60_000) attempts.delete(key)
  const key = createHash('sha256').update(email.toLowerCase()).digest('hex')
  if (attempts.has(key) || attempts.size >= 20) return false
  attempts.set(key, now)
  return true
}
