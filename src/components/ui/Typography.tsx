import { cn } from '@/lib/utils'

/* ─── Display Heading ─────────────────────────────────────────────────── */
interface HeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function H1({ children, className, as: Tag = 'h1' }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H2({ children, className, as: Tag = 'h2' }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display text-3xl font-semibold leading-snug tracking-tight text-[#f4f1ec] md:text-4xl',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H3({ children, className, as: Tag = 'h3' }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display text-2xl font-medium leading-snug text-[#f4f1ec] md:text-3xl',
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function H4({ children, className, as: Tag = 'h4' }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'text-lg font-semibold uppercase tracking-widest text-[#f4f1ec]',
        className
      )}
    >
      {children}
    </Tag>
  )
}

/* ─── Body ────────────────────────────────────────────────────────────── */
interface TextProps {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}

export function Body({ children, className, as: Tag = 'p' }: TextProps) {
  return (
    <Tag className={cn('text-base leading-relaxed text-[#e8e4de]', className)}>
      {children}
    </Tag>
  )
}

export function BodyLarge({ children, className, as: Tag = 'p' }: TextProps) {
  return (
    <Tag className={cn('text-lg leading-relaxed text-[#e8e4de] md:text-xl', className)}>
      {children}
    </Tag>
  )
}

export function Subtle({ children, className, as: Tag = 'p' }: TextProps) {
  return (
    <Tag className={cn('text-sm leading-relaxed text-[#9a9590]', className)}>
      {children}
    </Tag>
  )
}

/* ─── Label / Caption ─────────────────────────────────────────────────── */
interface LabelProps {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <span
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.2em] text-[#b8975a]',
        className
      )}
    >
      {children}
    </span>
  )
}

export function Caption({ children, className }: LabelProps) {
  return (
    <span className={cn('text-xs leading-relaxed text-[#9a9590]', className)}>
      {children}
    </span>
  )
}
