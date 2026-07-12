import { Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricHelp } from '@/components/dashboard/metric-help'
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
  docId,
}: {
  label: string
  value: string
  sub?: string
  emphasis?: boolean
  children?: React.ReactNode
  docId?: string
}) {
  return (
    <Card className="gap-2 py-4">
      <CardContent className="flex flex-col gap-1 px-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          {docId && <MetricHelp id={docId} />}
        </div>
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
  docId,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
  docId?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && (
              <p className="text-xs text-pretty text-muted-foreground">{description}</p>
            )}
          </div>
          {docId && <MetricHelp id={docId} />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
