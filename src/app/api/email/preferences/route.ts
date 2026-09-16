import { emailJson, readEmailJson } from '../../../../lib/emailHttp'
import { confirmEmailPreferences, inspectEmailPreferences, reduceEmailPreferences } from '../../../../lib/emailLifecycle'
export const runtime = 'nodejs'
export const maxDuration = 30
export async function POST(request: Request) {
  const value = await readEmailJson(request)
  if (!value || typeof value.token !== 'string' || value.token.length < 32 || value.token.length > 150 || !['verify','manage'].includes(String(value.kind))) return emailJson({ error: 'This private link is invalid. Request a new email from your profile.' }, 400)
  const kind = value.kind as 'verify' | 'manage'
  try {
    if (value.action === 'inspect') {
      const preferences = await inspectEmailPreferences(kind, value.token)
      return preferences ? emailJson({ preferences }) : emailJson({ error: 'This link has expired or was cancelled. Request a fresh email from your profile.' }, 410)
    }
    if (value.action === 'confirm' && kind === 'verify') {
      const result = await confirmEmailPreferences(value.token)
      return result ? emailJson(result) : emailJson({ error: 'This link has expired or was cancelled. Request a fresh email from your profile.' }, 410)
    }
    if (kind === 'manage' && ['cancel-reminder','unsubscribe','stop-all'].includes(String(value.action))) {
      const result = await reduceEmailPreferences(value.token, value.action as 'cancel-reminder' | 'unsubscribe' | 'stop-all')
      return result ? emailJson({ success: true, preferences: await inspectEmailPreferences(kind, value.token) }) : emailJson({ error: 'This private link is invalid.' }, 410)
    }
    return emailJson({ error: 'Choose one of the available actions.' }, 400)
  } catch { return emailJson({ error: 'Preferences are temporarily unavailable. Keep this email and try its link again later, or contact hello@iamneilgreene.com.' }, 503) }
}
