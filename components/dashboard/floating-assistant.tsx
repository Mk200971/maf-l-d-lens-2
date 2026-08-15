'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Sparkles,
  X,
  Plus,
  ExternalLink,
  Send,
  Loader2,
  SlidersHorizontal,
} from 'lucide-react'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { mainNav, moreNav } from '@/components/dashboard/pill-nav'
import { useFilters } from '@/lib/filters-context'
import { useChatStream } from '@/lib/use-chat-stream'
import { MarkdownMessage } from '@/components/chat/markdown-message'
import type { ChartSpec } from '@/lib/chart-spec'
import type { ChatScope } from '@/lib/chat-scope'
import { isScopeEmpty, scopeSummary } from '@/lib/chat-scope'
import { cn } from '@/lib/utils'

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

const DOCK_KEY = 'maf-lens-dock-pos'
const ORB_SIZE = 52
const VIEWPORT_MARGIN = 16
const SIGNATURE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

type Mode = 'orb' | 'panel' | 'chat'
type Quadrant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface Pos { x: number; y: number }

function clampToViewport(p: Pos): Pos {
  if (typeof window === 'undefined') return p
  const maxX = window.innerWidth - ORB_SIZE - VIEWPORT_MARGIN
  const maxY = window.innerHeight - ORB_SIZE - VIEWPORT_MARGIN
  return {
    x: Math.max(VIEWPORT_MARGIN, Math.min(p.x, Math.max(VIEWPORT_MARGIN, maxX))),
    y: Math.max(VIEWPORT_MARGIN, Math.min(p.y, Math.max(VIEWPORT_MARGIN, maxY))),
  }
}

function loadSavedPos(): Pos | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(DOCK_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Pos>
    if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
      return clampToViewport({ x: parsed.x, y: parsed.y })
    }
  } catch {
    /* ignore */
  }
  return null
}

function savePos(p: Pos) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(DOCK_KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

function defaultPos(): Pos {
  if (typeof window === 'undefined') return { x: 100, y: 100 }
  return clampToViewport({
    x: window.innerWidth - ORB_SIZE - 32,
    y: window.innerHeight - ORB_SIZE - 32,
  })
}

function quadrantFrom(pos: Pos): Quadrant {
  if (typeof window === 'undefined') return 'bottom-right'
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const left = pos.x < cx
  const top = pos.y < cy
  if (top && left) return 'top-left'
  if (top && !left) return 'top-right'
  if (!top && left) return 'bottom-left'
  return 'bottom-right'
}

/**
 * Convert the dashboard's active FilterState into a ChatScope that the
 * /api/chat route already knows how to merge into tool args. We drop
 * sessionIds and monthRange because the chat composer doesn't surface them.
 */
function filtersToScope(f: ReturnType<typeof useFilters>['filters']): ChatScope {
  return {
    years: f.years.length ? [...f.years] : undefined,
    bus: f.bus.length ? [...f.bus] : undefined,
    countries: f.countries.length ? [...f.countries] : undefined,
    roles: f.roles.length ? [...f.roles] : undefined,
    programs: f.programs.length ? [...f.programs] : undefined,
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────────

export function FloatingAssistant() {
  const router = useRouter()
  const { filters } = useFilters()

  // Active filter scope (live — chips update as the user changes page filters)
  const pageScope = useMemo(() => filtersToScope(filters), [filters])
  const pageScopeEmpty = isScopeEmpty(pageScope)

  // "Use page filters" toggle — default ON per spec
  const [usePageFilters, setUsePageFilters] = useState(true)
  const effectiveScope: ChatScope | undefined = usePageFilters ? pageScope : undefined

  // Position + mode
  const [pos, setPos] = useState<Pos>(() => loadSavedPos() ?? defaultPos())
  const [mode, setMode] = useState<Mode>('orb')

  // Dragging state
  const dragState = useRef<{
    pointerId: number | null
    startX: number
    startY: number
    startPos: Pos
    moved: boolean
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Orb pulse when a response arrives while closed
  const [pulse, setPulse] = useState(false)
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Refs for focus management + click-outside
  const orbRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Re-clamp on viewport resize so a smaller window can't strand the orb
  useEffect(() => {
    const onResize = () => setPos((p) => clampToViewport(p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Save position on changes (debounced via requestAnimationFrame)
  useEffect(() => {
    const id = requestAnimationFrame(() => savePos(pos))
    return () => cancelAnimationFrame(id)
  }, [pos])

  // ── Stream + completion ──────────────────────────────────────────────────
  const onResponseComplete = useCallback(() => {
    if (mode !== 'chat') {
      // Pulse the orb gold for ~3s when a response arrives while closed
      setPulse(true)
      if (pulseTimer.current) clearTimeout(pulseTimer.current)
      pulseTimer.current = setTimeout(() => setPulse(false), 3000)
    }
  }, [mode])

  const { messages, isLoading, sendMessage, reset } = useChatStream({
    scope: effectiveScope,
    onResponseComplete,
  })

  // Clean up pulse timer on unmount
  useEffect(() => {
    return () => {
      if (pulseTimer.current) clearTimeout(pulseTimer.current)
    }
  }, [])

  // ── Esc closes panel/chat ───────────────────────────────────────────────
  useEffect(() => {
    if (mode === 'orb') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode('orb')
        orbRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mode])

  // ── Click outside closes panel/chat ─────────────────────────────────────
  useEffect(() => {
    if (mode === 'orb') return
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node
      const container = mode === 'panel' ? panelRef.current : chatRef.current
      if (
        container &&
        !container.contains(target) &&
        orbRef.current &&
        !orbRef.current.contains(target)
      ) {
        setMode('orb')
        orbRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [mode])

  // ── Drag (pointer events: one path for mouse + touch) ───────────────────
  const DRAG_THRESHOLD_MOUSE = 6
  const DRAG_THRESHOLD_TOUCH = 10

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Only react to primary button / touch / pen
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragState.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startPos: { ...pos },
      moved: false,
    }
    // Capture so we keep getting move events even if pointer leaves the orb
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const ds = dragState.current
    if (!ds || ds.pointerId !== e.pointerId) return
    const dx = e.clientX - ds.startX
    const dy = e.clientY - ds.startY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const threshold =
      e.pointerType === 'touch' ? DRAG_THRESHOLD_TOUCH : DRAG_THRESHOLD_MOUSE
    if (!ds.moved && dist < threshold) return
    if (!ds.moved) {
      ds.moved = true
      setIsDragging(true)
      // Suspend idle float while dragging
    }
    setPos(clampToViewport({ x: ds.startPos.x + dx, y: ds.startPos.y + dy }))
  }

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const ds = dragState.current
    if (!ds) return
    const wasDrag = ds.moved
    dragState.current = null
    setIsDragging(false)
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
    // If it was a drag, don't also toggle the panel open.
    if (wasDrag) return
    // It was a tap — open the panel.
    setMode((m) => (m === 'orb' ? 'panel' : 'orb'))
  }

  // ── Starter chips (page-aware) ────────────────────────────────────────────
  const pathname = usePathname()
  const starters = useMemo(() => buildStarters(pathname, pageScope), [pathname, pageScope])

  // ── Quadrant-aware placement for panel/chat ──────────────────────────────
  const q = quadrantFrom(pos)
  // For PANEL: opens toward open space.
  // For CHAT: 380x520 on desktop, full-screen sheet below 768px.
  const panelPlacement = placementForPanel(q)
  const chatPlacement = placementForChat(q)

  return (
    <>
      {/* ORB */}
      <button
        ref={orbRef}
        type="button"
        aria-label="Navigation and assistant"
        aria-expanded={mode !== 'orb'}
        aria-haspopup="dialog"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          'fixed z-50 flex items-center justify-center rounded-full',
          'bg-gradient-to-br from-[var(--brand-gold)] to-[var(--brand-amber)]',
          'ring-1 ring-white/25',
          'select-none touch-none',
          !isDragging && 'orb-idle',
          isDragging && 'cursor-grabbing',
          !isDragging && 'cursor-pointer',
          pulse && 'animate-pulse',
        )}
        style={{
          left: pos.x,
          top: pos.y,
          width: ORB_SIZE,
          height: ORB_SIZE,
          boxShadow: isDragging
            ? '0 16px 48px rgba(180,151,90,.55), 0 0 0 1px rgba(255,255,255,.35) inset'
            : '0 8px 32px rgba(180,151,90,.35), 0 0 0 1px rgba(255,255,255,.18) inset',
          transition: isDragging ? 'none' : `box-shadow 0.3s ${SIGNATURE_EASE}`,
        }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={28}
          height={28}
          className="rounded-full object-cover pointer-events-none"
        />
      </button>

      {/* PANEL */}
      {mode === 'panel' && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Navigation"
          className="glass-panel fixed z-50 w-64 rounded-2xl p-2 shadow-2xl"
          style={{
            ...panelPlacement,
            transition: `transform 0.3s ${SIGNATURE_EASE}, opacity 0.3s ${SIGNATURE_EASE}`,
          }}
        >
          <nav className="flex flex-col gap-0.5">
            {[...mainNav, ...moreNav].map((item, i) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMode('orb')}
                  className={cn(
                    'flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold uppercase tracking-wide transition-all',
                    active
                      ? 'bg-[var(--brand-gold)] text-white shadow-md shadow-[var(--brand-gold)]/30'
                      : 'text-foreground hover:bg-white/70',
                  )}
                  style={{
                    animation: `float-bob 0s`, // placeholder so React re-renders aren't janky
                    opacity: 0,
                    transform: 'translateY(8px)',
                    animationName: 'panelItemIn',
                    animationDuration: '0.35s',
                    animationDelay: `${i * 35}ms`,
                    animationFillMode: 'forwards',
                    animationTimingFunction: SIGNATURE_EASE,
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="my-2 h-px bg-white/30" />

          <button
            type="button"
            onClick={() => setMode('chat')}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--brand-gold)] to-[var(--brand-amber)] py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-[var(--brand-gold)]/30 transition-transform"
            style={{
              animation: 'orbPulse 2s ease-in-out infinite',
            }}
          >
            <Sparkles size={14} className="transition-transform group-hover:scale-110" />
            Ask Lens
          </button>
        </div>
      )}

      {/* CHAT */}
      {mode === 'chat' && (
        <div
          ref={chatRef}
          role="dialog"
          aria-label="Ask Lens chat"
          className={cn(
            'glass-panel fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl',
            // Mobile: full-screen sheet
            'inset-2 rounded-2xl md:inset-auto',
          )}
          style={{
            ...chatPlacement,
            transition: `transform 0.3s ${SIGNATURE_EASE}, opacity 0.3s ${SIGNATURE_EASE}`,
          }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-2 border-b border-white/30 px-3 py-2">
            <Sparkles size={14} className="text-[var(--brand-burgundy)]" />
            <span className="text-sm font-semibold">Ask Lens</span>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  reset()
                }}
                title="New chat"
                aria-label="New chat"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-white/60 hover:text-foreground"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('orb')
                  orbRef.current?.focus()
                  router.push('/metrics-ai')
                }}
                title="Open full view"
                aria-label="Open full view"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-white/60 hover:text-foreground"
              >
                <ExternalLink size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('orb')
                  orbRef.current?.focus()
                }}
                title="Close"
                aria-label="Close chat"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-white/60 hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Scope row — the point of the feature */}
          <div className="shrink-0 border-b border-white/30 px-3 py-2">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Using your current filters
              </span>
              <button
                type="button"
                onClick={() => setUsePageFilters((v) => !v)}
                role="switch"
                aria-checked={usePageFilters}
                aria-label="Use page filters"
                className={cn(
                  'relative h-4 w-7 rounded-full transition',
                  usePageFilters ? 'bg-[var(--brand-gold)]' : 'bg-white/40',
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 size-3 rounded-full bg-white shadow-sm transition-all',
                    usePageFilters ? 'left-3.5' : 'left-0.5',
                  )}
                />
              </button>
            </div>
            {usePageFilters && !pageScopeEmpty ? (
              <div className="flex flex-wrap gap-1">
                {renderScopeChips(pageScope)}
              </div>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                {usePageFilters ? 'All data' : 'Page filters off — sending no scope'}
              </span>
            )}
          </div>

          {/* Messages area — flex-1 min-h-0 overflow-y-auto is the scroll rule */}
          <div
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3"
            role="log"
            aria-live="polite"
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Sparkles size={28} className="mb-3 text-[var(--brand-gold)]" />
                <p className="mb-3 text-xs text-muted-foreground">
                  Ask anything about your L&amp;D data.
                </p>
                <div className="flex w-full flex-col gap-1.5">
                  {starters.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="w-full rounded-full bg-white/60 px-3 py-1.5 text-left text-[11px] text-foreground backdrop-blur-md transition hover:bg-white/85"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((m) => (
                  <MiniMessage key={m.id} role={m.role} content={m.content} charts={m.charts} />
                ))}
                {isLoading && (
                  <div className="mb-2 flex justify-start">
                    <div className="glass-pill flex items-center gap-2 rounded-2xl rounded-bl-md px-3 py-2">
                      <Loader2 size={12} className="animate-spin" />
                      <span className="text-[11px] text-muted-foreground">Thinking…</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Composer — shrink-0 so it stays pinned */}
          <div className="shrink-0 border-t border-white/30 p-2">
            <MiniComposer
              disabled={isLoading}
              onSend={(text, opts) => sendMessage(text, opts)}
            />
          </div>
        </div>
      )}

      {/* Inline keyframes for panel items + orb pulse */}
      <style jsx global>{`
        @keyframes panelItemIn {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes panelItemIn { 0%, 100% { opacity: 1; transform: none; } }
          @keyframes orbPulse { 0%, 100% { transform: none; } }
        }
      `}</style>
    </>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────

function MiniMessage({
  role,
  content,
  charts,
}: {
  role: 'user' | 'assistant'
  content: string
  charts?: ChartSpec[]
}) {
  return (
    <div className={cn('mb-2 flex', role === 'user' ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'rounded-2xl px-3 py-2 text-xs',
          role === 'user'
            ? 'max-w-[85%] rounded-br-sm bg-[var(--brand-burgundy)] text-white shadow'
            : 'max-w-[92%] rounded-bl-sm bg-white/70 backdrop-blur-md',
        )}
      >
        {role === 'assistant' ? (
          <MarkdownMessage content={content} />
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
        {charts && charts.length > 0 && (
          <div className="mt-2 space-y-2">
            {charts.map((c, i) => (
              <CompactChart key={i} spec={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CompactChart({ spec }: { spec: ChartSpec }) {
  // Compact variant of DynamicChart — height 160 instead of 220.
  // Inline implementation rather than prop-drilling into DynamicChart so
  // we don't churn the full-page renderer's API.
  const COLORS = ['var(--brand-gold)', 'var(--brand-burgundy)', 'var(--brand-amber)']
  if (!spec.data || spec.data.length === 0) {
    return (
      <div className="rounded-xl bg-white/40 p-3 text-center text-[11px] text-muted-foreground">
        No data for this slice
      </div>
    )
  }
  return (
    <div className="rounded-xl bg-white/40 p-2 backdrop-blur-sm">
      <p className="mb-0.5 text-[11px] font-semibold text-foreground">{spec.title}</p>
      {spec.subtitle && (
        <p className="mb-1 text-[10px] text-muted-foreground">{spec.subtitle}</p>
      )}
      <CompactChartRender spec={spec} colors={COLORS} />
      {spec.note && (
        <p className="mt-1 text-[10px] italic text-muted-foreground">{spec.note}</p>
      )}
    </div>
  )
}

// Tiny inline recharts render — kept here so the mini chart doesn't drag
// in the entire DynamicChart bundle path.
function CompactChartRender({
  spec,
  colors,
}: {
  spec: ChartSpec
  colors: string[]
}) {
  const H = 160
  switch (spec.kind) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={H}>
          <BarChart data={spec.data}>
            <Tooltip />
            <Bar dataKey="value" name={spec.measure}>
              {spec.data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={H}>
          <LineChart data={spec.data}>
            <Tooltip />
            <Line type="monotone" dataKey="value" name={spec.measure} stroke={colors[0]} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={H}>
          <PieChart>
            <Tooltip />
            <Pie data={spec.data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={60}>
              {spec.data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    case 'kpi':
      return (
        <div className="flex h-[160px] items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: colors[0] }}>
              {spec.data[0]?.value.toLocaleString()}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">{spec.unit || spec.measure}</p>
          </div>
        </div>
      )
    default:
      return null
  }
}

function MiniComposer({
  disabled,
  onSend,
}: {
  disabled: boolean
  onSend: (text: string, opts?: { forceChart?: boolean }) => void
}) {
  const [text, setText] = useState('')
  const [forceChart, setForceChart] = useState(false)

  const submit = () => {
    const t = text.trim()
    if (!t || disabled) return
    onSend(t, { forceChart })
    setText('')
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/70 p-1 backdrop-blur-md">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            submit()
          }
        }}
        placeholder="Ask about your data…"
        disabled={disabled}
        className="flex-1 bg-transparent px-2 py-1 text-xs outline-none"
      />
      <button
        type="button"
        onClick={() => setForceChart((v) => !v)}
        disabled={disabled}
        title="Force a chart in the response"
        aria-pressed={forceChart}
        className={cn(
          'flex size-7 items-center justify-center rounded-full transition',
          forceChart
            ? 'bg-[var(--brand-gold)]/20 text-[var(--brand-burgundy)] ring-1 ring-[var(--brand-gold)]/50'
            : 'text-muted-foreground hover:bg-white/60',
        )}
      >
        <SlidersHorizontal size={12} />
      </button>
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !text.trim()}
        className="flex size-7 items-center justify-center rounded-full bg-[var(--brand-burgundy)] text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
      >
        {disabled ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
      </button>
    </div>
  )
}

function renderScopeChips(scope: ChatScope) {
  const chips: { label: string; value: string }[] = []
  if (scope.years?.length) chips.push({ label: 'Y', value: scope.years.map(String).join('/') })
  if (scope.bus?.length) chips.push({ label: 'BU', value: scope.bus.join('/') })
  if (scope.countries?.length) chips.push({ label: 'CO', value: scope.countries.join('/') })
  if (scope.roles?.length) chips.push({ label: 'RO', value: scope.roles.join('/') })
  if (scope.programs?.length)
    chips.push({ label: 'PR', value: `${scope.programs.length} programme${scope.programs.length > 1 ? 's' : ''}` })
  return chips.map((c, i) => (
    <span
      key={i}
      className="flex items-center gap-1 rounded-full border border-[var(--brand-gold)]/30 bg-white/60 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md"
    >
      <span className="font-bold text-[var(--brand-burgundy)]">{c.label}</span>
      <span className="text-foreground">{c.value}</span>
    </span>
  ))
}

// ──────────────────────────────────────────────────────────────────────────────
// Misc helpers
// ──────────────────────────────────────────────────────────────────────────────

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

function placementForPanel(q: Quadrant): React.CSSProperties {
  // PANEL: opens toward open space. w-64 = 256px.
  switch (q) {
    case 'top-left': // open down + right
      return { left: 'auto', right: 16, top: 16, bottom: 'auto' }
    case 'top-right': // open down + left
      return { left: 16, right: 'auto', top: 16, bottom: 'auto' }
    case 'bottom-left': // open up + right
      return { left: 'auto', right: 16, top: 'auto', bottom: 16 }
    case 'bottom-right': // open up + left
    default:
      return { left: 16, right: 'auto', top: 'auto', bottom: 16 }
  }
}

function placementForChat(q: Quadrant): React.CSSProperties {
  // CHAT: 380x520 desktop, full-screen sheet below 768px (handled by classes).
  // Use vw/vh-friendly positioning relative to viewport edges.
  switch (q) {
    case 'top-left':
      return { left: 'auto', right: 16, top: 16, bottom: 'auto', width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, calc(100vh - 32px))' }
    case 'top-right':
      return { left: 16, right: 'auto', top: 16, bottom: 'auto', width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, calc(100vh - 32px))' }
    case 'bottom-left':
      return { left: 'auto', right: 16, top: 'auto', bottom: 16, width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, calc(100vh - 32px))' }
    case 'bottom-right':
    default:
      return { left: 16, right: 'auto', top: 'auto', bottom: 16, width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, calc(100vh - 32px))' }
  }
}

function buildStarters(pathname: string | null, scope: ChatScope): string[] {
  const summary = scopeSummary(scope)
  const ctx = summary ? ` (${summary})` : ''
  if (!pathname) return ['How are we doing?', 'Show learning hours by BU', 'Top 3 programmes']
  if (pathname.startsWith('/mandatory')) {
    return [
      'Which entities are behind?',
      'Compliance trend',
      'Biggest gaps',
    ]
  }
  if (pathname.startsWith('/eligibility')) {
    return [
      'Completion rate by programme',
      'Where are the biggest gaps?',
      `How are we doing${ctx}?`,
    ]
  }
  if (pathname.startsWith('/feedback')) {
    return ['NPS by programme', 'Satisfaction by country', `Feedback volume${ctx}`]
  }
  if (pathname.startsWith('/learners')) {
    return ['Reach by BU', 'Unique learners trend', `Top countries${ctx}`]
  }
  if (pathname.startsWith('/programs')) {
    return ['Hours by programme', `Top programmes${ctx}`, 'Feedback volume per programme']
  }
  // Default (Overview, All Activity, SkillUp, etc.)
  return [
    `How are we doing${ctx}?`,
    'Show learning hours by country',
    'Top 3 programmes',
  ]
}
