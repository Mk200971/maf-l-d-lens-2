import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function PageHeaderSkeleton() {
  return (
    <header className="flex flex-col gap-3">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </header>
  )
}

export function KpiGridSkeleton() {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="gap-2 py-4">
          <CardContent className="flex flex-col gap-3 px-4">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="size-4" />
            </div>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-3 w-40" />
          </CardContent>
        </Card>
      ))}
    </section>
  )
}

export function ChartGridSkeleton({ columns = 2 }: { columns?: number }) {
  return (
    <div className={`grid grid-cols-1 gap-4 lg:grid-cols-${columns}`}>
      {Array.from({ length: columns }).map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-8" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function DashboardPageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSkeleton />
      <KpiGridSkeleton />
      <ChartGridSkeleton columns={2} />
      <ChartGridSkeleton columns={1} />
    </div>
  )
}
