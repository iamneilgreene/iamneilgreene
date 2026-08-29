import Container from './Container'
import { cn } from '@/lib/utils'

type Ground = 'ink' | 'ink-raised' | 'ink-sunken' | 'bone'
type Pad = 'lg' | 'md' | 'sm' | 'none'

interface SectionProps {
  children: React.ReactNode
  /** Section number, e.g. "03" — the Linear/Obys numbering language. */
  index?: string
  id?: string
  ground?: Ground
  pad?: Pad
  width?: 'narrow' | 'default' | 'wide'
  className?: string
  /** Renders a hairline across the top of the section. */
  topRule?: boolean
}

const grounds: Record<Ground, string> = {
  ink: 'bg-ink-900 text-text-body',
  'ink-raised': 'bg-ink-850 text-text-body',
  'ink-sunken': 'bg-ink-950 text-text-body',
  bone: 'bg-bone-100 text-ink-on-bone-body',
}

const pads: Record<Pad, string> = {
  lg: 'py-24 md:py-32 lg:py-40',
  md: 'py-16 md:py-24',
  sm: 'py-10 md:py-14',
  none: '',
}

export default function Section({
  children,
  index,
  id,
  ground = 'ink',
  pad = 'lg',
  width = 'default',
  className,
  topRule = false,
}: SectionProps) {
  const onBone = ground === 'bone'

  return (
    <section
      id={id}
      className={cn(
        'relative',
        grounds[ground],
        pads[pad],
        topRule && (onBone ? 'border-t border-hairline-on-bone' : 'border-t border-hairline'),
        className
      )}
    >
      {index && (
        <Container width={width}>
          <span
            className={cn(
              'label mb-10 block md:mb-14',
              onBone && 'text-ink-on-bone-muted'
            )}
            aria-hidden="true"
          >
            {index}
          </span>
        </Container>
      )}
      <Container width={width}>{children}</Container>
    </section>
  )
}
