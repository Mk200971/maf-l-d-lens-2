import { Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-balance text-accent">{title}</h1>
      {description && (
        <p className="text-sm text-pretty text-muted-foreground">{description}</p>
      )}
    </header>
  )
}

export function InfoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      className="flex items-start gap-2.5 rounded-lg border border-brand-amber/50 bg-brand-amber/10 px-4 py-3 text-sm text-foreground"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-brand-amber" aria-hidden="true" />
      <p className="text-pretty leading-relaxed">{children}</p>
    </div>
  )
}

export function KpiTile({
  label,
  value,
  sub,
  emphasis = false,
  children,
}: {
  label: string
  value: string
  sub?: string
  emphasis?: boolean
  children?: React.ReactNode
}) {
  return (
    <Card className="gap-2 py-4">
      <CardContent className="flex flex-col gap-1 px-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            'text-3xl font-semibold tabular-nums',
            emphasis ? 'text-accent' : 'text-primary',
          )}
        >
          {value}
        </span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
        {children}
      </CardContent>
    </Card>
  )
}

export function ChartCard({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && (
          <p className="text-xs text-pretty text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
