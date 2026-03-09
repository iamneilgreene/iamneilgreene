import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  /** Use 'narrow' for text-heavy content, 'wide' for full bleed sections */
  width?: 'default' | 'narrow' | 'wide'
}

export default function PageContainer({
  children,
  className,
  width = 'default',
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-10 lg:px-16',
        {
          'max-w-7xl': width === 'default',
          'max-w-3xl': width === 'narrow',
          'max-w-screen-2xl': width === 'wide',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
