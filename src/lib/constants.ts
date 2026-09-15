/* ═══════════════════════════════════════════════════════════════════════
   LOCKED BRAND LANGUAGE
   Sourced from the Master Council & Strategy doc (Formal Philosophy Lock,
   Formal Framework Lock, Assessment Naming Lock, Audience Architecture Lock).
   Do not paraphrase these strings — they are the brand's memory structure.
   ═══════════════════════════════════════════════════════════════════════ */

export const SITE_NAME = 'Neil Greene'
export const SITE_URL = 'https://iamneilgreene.com'

/** Core philosophy. Supersedes the retired "Power Follows Capability". */
export const PHILOSOPHY = 'Responsibility demands capability.'
/** Movement principle — used to close the site and the full profile. */
export const MOVEMENT = 'Expand capability. Carry responsibility.'
/** Supporting belief. */
export const BELIEF = 'Capability is real power.'
/** The enemy. */
export const ENEMY = 'One-Dimensional Success'

export const SITE_DESCRIPTION =
  'Ideas, systems, and experiences for builders, leaders, and people carrying meaningful responsibility who want to expand what they can understand, access, handle, and lead.'

/* ─── The Four Dimensions of Capability ─────────────────────────────────
   MIND • MEANS • MEASURE • MASTERY. The question sequence is locked.
   ──────────────────────────────────────────────────────────────────── */

export type MKey = 'mind' | 'means' | 'measure' | 'mastery'

export interface Dimension {
  key: MKey
  name: string
  /** Locked public question. Never reworded. */
  question: string
  /** One-line definition for the scroll reveal. */
  essence: string
  /** Facet list — what the dimension actually covers. */
  covers: readonly string[]
  /** Responsibility-response framing: "Do you know what to do?" etc. */
  response: string
}

export const DIMENSIONS: readonly Dimension[] = [
  {
    key: 'mind',
    name: 'Mind',
    question: 'What do you know?',
    essence:
      'Knowledge becomes capability only when it turns into judgment, adaptation, and decisions that hold under pressure.',
    covers: ['Judgment', 'Learning', 'Strategy', 'Discernment', 'Adaptability'],
    response: 'Do you know what to do?',
  },
  {
    key: 'means',
    name: 'Means',
    question: 'What do you have?',
    essence:
      'Not simply wealth. The resources, relationships, tools, systems, reputation, and options you can actually mobilize.',
    covers: ['Resources', 'Skills', 'Technology', 'Relationships', 'Capital', 'Access'],
    response: 'Do you have what you need?',
  },
  {
    key: 'measure',
    name: 'Measure',
    question: 'What can you handle?',
    essence:
      'Evidence of actual capacity. Appearance does not count. What you can carry, withstand, and deliver when demand rises.',
    covers: ['Health', 'Strength', 'Energy', 'Resilience', 'Composure', 'Execution'],
    response: 'Can you handle what is required?',
  },
  {
    key: 'mastery',
    name: 'Mastery',
    question: 'What can you lead?',
    essence:
      'Self-governance first, then people and outcomes. Leadership is not a title; it is the effect you have on those who depend on you.',
    covers: ['Self-command', 'Standards', 'Communication', 'Stewardship', 'Outcomes'],
    response: 'Can you take responsibility and lead the response?',
  },
] as const

/* ─── Calls to action ──────────────────────────────────────────────── */

export const CTA_PRIMARY = {
  label: 'Get Your Capability Profile',
  href: '/capability-profile',
} as const

export const CTA_PRIMARY_SHORT = { label: 'Get Your Profile', href: '/capability-profile' } as const
export const CTA_SECONDARY = { label: 'Explore Capability', href: '/capability' } as const

/* ─── Navigation ───────────────────────────────────────────────────────
   Recommended top nav from the blueprint. No empty categories: every
   entry below resolves to a real page.
   ──────────────────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: 'Capability', href: '/capability' },
  { label: 'Ideas', href: '/ideas' },
  {
    label: 'Work With Neil',
    href: '/work',
    children: [
      { label: 'For Individuals', href: '/work/individuals' },
      { label: 'For Organizations', href: '/work/organizations' },
      { label: 'Speaking', href: '/speaking' },
    ],
  },
  { label: 'Community', href: '/community' },
  { label: 'Books', href: '/books' },
  { label: 'About', href: '/about' },
] as const

export const FOOTER_NAV = [
  {
    heading: 'Capability',
    links: [
      { label: 'The Four Dimensions', href: '/capability' },
      { label: 'Get Your Profile', href: '/capability-profile' },
      { label: 'Ideas', href: '/ideas' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'For Individuals', href: '/work/individuals' },
      { label: 'For Organizations', href: '/work/organizations' },
      { label: 'Speaking', href: '/speaking' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Books', href: '/books' },
      { label: 'Community', href: '/community' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const

/* ─── Social ───────────────────────────────────────────────────────────
   Handle is locked to @iamneilgreene across platforms.
   ──────────────────────────────────────────────────────────────────── */

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/iamneilgreene' },
  { label: 'YouTube', href: 'https://www.youtube.com/@IAmNeilGreene' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/neilgreene' },
  { label: 'Facebook', href: 'https://www.facebook.com/king0neil/' },
] as const

export const HANDLE = '@iamneilgreene'

/* ─── Books — proof that the worldview developed across domains ────── */

export interface Book {
  slug: string
  title: string
  subtitle?: string
  blurb: string
  /** Null while a cover does not exist yet. Consumers render a typographic
      plate instead, so this must stay nullable even when every book has one. */
  cover: string | null
}

export const BOOKS: readonly Book[] = [
  {
    slug: 'exposed',
    title: 'Exposed',
    blurb:
      'Digital risk, technology, security, and the leadership judgment required when systems fail.',
    subtitle: 'Inside Risks and the New Architecture of AI Defense',
    cover: '/images/exposed-cover.webp',
  },
  {
    slug: 'ignite',
    title: 'Ignite',
    subtitle: 'Fitness Fuel for Working Dads',
    blurb:
      'Performance, discipline, and resilience for people whose responsibilities arrived before their capacity did.',
    cover: '/images/ignite-cover.webp',
  },
] as const
