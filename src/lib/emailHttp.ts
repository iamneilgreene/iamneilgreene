export function emailJson(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } })
}
export async function readEmailJson(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return null
  const origin = request.headers.get('origin')
  if (origin) {
    try { if (new URL(origin).host !== (request.headers.get('host') ?? new URL(request.url).host)) return null } catch { return null }
  }
  const reader = request.body?.getReader()
  if (!reader) return null
  let text = ''; let size = 0
  const decoder = new TextDecoder('utf-8', { fatal: true })
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      size += chunk.value.byteLength
      if (size > 4096) { await reader.cancel(); return null }
      text += decoder.decode(chunk.value, { stream: true })
    }
    const value = JSON.parse(text + decoder.decode())
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null
  } catch { return null }
}
