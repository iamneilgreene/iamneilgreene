import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold-outline'
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
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  onClick?: undefined
  type?: undefined
  disabled?: undefined
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#b8975a] text-[#0d0d0d] font-semibold hover:bg-[#d4af72] active:bg-[#9a7d45]',
  secondary:
    'bg-[#1e1e1e] text-[#e8e4de] border border-[#2e2e2e] hover:border-[#b8975a] hover:text-[#b8975a]',
  ghost:
    'bg-transparent text-[#9a9590] hover:text-[#e8e4de] hover:bg-[#1e1e1e]',
  'gold-outline':
    'bg-transparent border border-[#b8975a] text-[#b8975a] hover:bg-[#b8975a] hover:text-[#0d0d0d]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-none tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b8975a] focus-visible:outline-offset-2'

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
      <Link href={href} className={classes}>
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
