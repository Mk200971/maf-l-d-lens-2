'use client'

import { useMemo, useState } from 'react'
import { BookOpen, Calculator, CircleHelp, Filter, Search, TrendingUp, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { metricDocById, metricDocs, metricPages, type MetricDoc } from '@/lib/metric-docs'
import { cn } from '@/lib/utils'

function DefinitionContent({ doc }: { doc: MetricDoc }) {
  const sections = [
    { label: 'How it is calculated', text: doc.calculation, icon: Calculator },
    { label: 'How leadership should read it', text: doc.interpretation, icon: TrendingUp },
    { label: 'Filter scope', text: doc.scope, icon: Filter },
    ...(doc.caveat ? [{ label: 'Important context', text: doc.caveat, icon: TriangleAlert }] : []),
  ]
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm leading-relaxed text-foreground">{doc.summary}</p>
      </div>
      <div className="flex flex-col gap-4">
        {sections.map(({ label, text, icon: Icon }) => (
          <section key={label} className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <Icon className="size-4" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">{label}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export function MetricHelp({ id, className }: { id: string; className?: string }) {
  const doc = metricDocById[id]
  if (!doc) return null
  return (
    <Sheet>
      <TooltipProvider delay={250}>
        <Tooltip>
          <TooltipTrigger
            render={
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className={cn('size-7 shrink-0 text-muted-foreground hover:text-foreground', className)}
                    aria-label={`About ${doc.title}`}
                    onClick={(event) => event.stopPropagation()}
                  />
                }
              />
            }
          >
            <CircleHelp aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-72 text-pretty leading-relaxed">
            {doc.summary} Select for the full definition.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pr-12">
          <Badge variant="secondary" className="mb-2 w-fit">{doc.page}</Badge>
          <SheetTitle className="text-xl font-semibold text-balance">{doc.title}</SheetTitle>
          <SheetDescription>Definition and interpretation guide</SheetDescription>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1 px-4 pb-6">
          <DefinitionContent doc={doc} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export function MetricGuide() {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const matches = useMemo(() => metricDocs.filter((doc) => !normalized || `${doc.title} ${doc.summary} ${doc.page}`.toLowerCase().includes(normalized)), [normalized])

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" className="h-8 bg-card text-xs" />}>
        <BookOpen data-icon="inline-start" />
        Metric guide
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <SheetTitle className="text-xl font-semibold">Dashboard metric guide</SheetTitle>
          <SheetDescription>Plain-English definitions for every leadership measure.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <label htmlFor="metric-search" className="sr-only">Search metrics</label>
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
            <Search className="size-4 text-muted-foreground" aria-hidden="true" />
            <input id="metric-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a metric or page…" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        <ScrollArea className="min-h-0 flex-1 px-4 pb-6">
          <div className="mb-5 rounded-lg border bg-secondary/50 p-4">
            <h3 className="font-semibold">How to read this dashboard</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Start with reach and delivery volume, then check quality and eligible completion. Read every percentage with its denominator or response count, compare trends rather than isolated points, and treat survey measures as signals—not proof of business impact.</p>
          </div>
          <div className="flex flex-col gap-6">
            {metricPages.map((page) => {
              const docs = matches.filter((doc) => doc.page === page)
              if (!docs.length) return null
              return (
                <section key={page} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{page}</h3>
                    <Separator className="flex-1" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {docs.map((doc) => (
                      <details key={doc.id} className="group rounded-lg border bg-card px-4 py-3 open:shadow-sm">
                        <summary className="cursor-pointer list-none font-medium marker:hidden">{doc.title}<span className="float-right text-muted-foreground group-open:rotate-45">+</span></summary>
                        <div className="pt-4"><DefinitionContent doc={doc} /></div>
                      </details>
                    ))}
                  </div>
                </section>
              )
            })}
            {!matches.length && <p className="py-10 text-center text-sm text-muted-foreground">No metric matches “{query}”.</p>}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
