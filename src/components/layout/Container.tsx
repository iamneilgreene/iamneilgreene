import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** narrow: editorial prose · default: standard grid · wide: media sequences */
  width?: 'narrow' | 'default' | 'wide'
}

export default function Container({
  children,
  className,
  width = 'default',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-10 lg:px-14',
        {
          'max-w-[46rem]': width === 'narrow',
          'max-w-[80rem]': width === 'default',
          'max-w-[96rem]': width === 'wide',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
