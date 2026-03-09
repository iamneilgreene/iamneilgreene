import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  /** Semantic HTML element to render */
  as?: 'section' | 'div' | 'article' | 'aside'
  /** Visual background variant */
  variant?: 'default' | 'dark' | 'charcoal' | 'bordered'
  /** Vertical padding size */
  spacing?: 'sm' | 'md' | 'lg' | 'none'
}

export default function SectionWrapper({
  children,
  className,
  as: Tag = 'section',
  variant = 'default',
  spacing = 'lg',
}: SectionWrapperProps) {
  return (
    <Tag
      className={cn(
        // Spacing
        {
          'py-16 md:py-24': spacing === 'lg',
          'py-10 md:py-16': spacing === 'md',
          'py-6 md:py-10': spacing === 'sm',
          'py-0': spacing === 'none',
        },
        // Background variants
        {
          'bg-brand-black': variant === 'default',
          'bg-brand-dark': variant === 'dark',
          'bg-brand-charcoal': variant === 'charcoal',
          'bg-brand-black border-y border-brand-border': variant === 'bordered',
        },
        className
      )}
    >
      {children}
    </Tag>
  )
}
