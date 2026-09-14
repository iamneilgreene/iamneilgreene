import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'bronze' | 'on-bone'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  onClick?: undefined
  type?: undefined
  disabled?: undefined
  'aria-label'?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

/**
 * Square corners are deliberate. Cobalt carries every primary action —
 * it is the system's single "interactive" signal. Bronze is reserved for
 * prestige moments and never competes with a primary CTA on the same screen.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-cobalt-500 text-bone-50 font-medium hover:bg-cobalt-600 active:bg-cobalt-600 shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset]',
  secondary:
    'bg-transparent text-text-primary border border-border-input hover:border-slate-500 hover:bg-ink-800',
  ghost:
    'bg-transparent text-text-muted hover:text-text-primary',
  bronze:
    'bg-transparent border border-bronze-500 text-bronze-400 hover:bg-bronze-500 hover:text-ink-900 hover:border-bronze-500',
  'on-bone':
    'bg-ink-900 text-bone-50 font-medium hover:bg-ink-800',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 py-2 text-[0.8125rem]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[0.9375rem]',
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 tracking-[-0.01em] transition-colors duration-200 whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none'

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  if (href !== undefined) {
    return (
      <Link href={href} className={classes} aria-label={rest['aria-label']}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  )
}
