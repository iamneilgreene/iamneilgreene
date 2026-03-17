/* ─── Brand ───────────────────────────────────────────────────────────── */
export const SITE_NAME = 'Neil Greene'
export const SITE_TAGLINE = 'Forged By War'
export const SITE_DESCRIPTION =
  'Neil Greene — veteran, coach, and speaker helping high-performers build the life they fought for.'
export const SITE_URL = 'https://iamneilgreene.com'

/* ─── Navigation ──────────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  {
    label: 'Coaching',
    href: '/coaching',
    children: [
      { label: 'Private Coaching', href: '/coaching/private' },
      { label: 'Group Coaching', href: '/coaching/group' },
    ],
  },
  { label: 'Community', href: '/community' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Book', href: '/book' },
  { label: 'Resources', href: '/resources' },
] as const

export const CTA_PRIMARY = { label: 'Apply Now', href: '/apply/form' }
export const CTA_SECONDARY = { label: 'Contact', href: '/contact' }

/* ─── Social Links ────────────────────────────────────────────────────── */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/iamneilgreene', handle: '@iamneilgreene' },
  { label: 'YouTube', href: 'https://www.youtube.com/@IAmNeilGreene', handle: 'Neil Greene' },
  { label: 'Facebook', href: 'https://www.facebook.com/king0neil/', handle: 'Neil Greene' },
] as const

/* ─── Footer ──────────────────────────────────────────────────────────── */
export const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Coaching', href: '/coaching' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Book', href: '/book' },
  { label: 'Resources', href: '/resources' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
] as const
