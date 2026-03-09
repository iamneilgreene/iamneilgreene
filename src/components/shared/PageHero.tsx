import PageContainer from '@/components/layout/PageContainer'
import { H1, Label, BodyLarge } from '@/components/ui/Typography'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  /** Centres content — used on most interior pages */
  align?: 'left' | 'center'
  className?: string
}

export default function PageHero({
  label,
  title,
  subtitle,
  align = 'left',
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative border-b border-[#2e2e2e] bg-[#141414] pt-32 pb-16 md:pt-40 md:pb-20',
        className
      )}
    >
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer>
        <div className={cn('flex flex-col gap-5', align === 'center' && 'items-center text-center')}>
          {label && <Label>{label}</Label>}

          <H1 className={cn(align === 'center' && 'max-w-3xl')}>{title}</H1>

          {subtitle && (
            <BodyLarge className={cn('max-w-2xl text-[#9a9590]')}>{subtitle}</BodyLarge>
          )}

          {/* Decorative accent line */}
          <span className="mt-2 block h-px w-12 bg-[#b8975a]" />
        </div>
      </PageContainer>
    </section>
  )
}
