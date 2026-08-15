'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PillNav } from '@/components/dashboard/pill-nav'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { FloatingAssistant } from '@/components/dashboard/floating-assistant'

// Reserved layout space (in px) so content does not shift when the bar
// collapses on scroll. The PillNav is ~60px tall (3px top padding + ~44px
// nav + 8px bottom padding). FilterBar adds another ~48px.
const RESERVED_TOP_SPACE = 110

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMetricsAI = pathname === '/metrics-ai'

  // Scroll-aware fade: scrolling DOWN past 40px fades out the bar + filter
  // and fades in the orb. Scrolling UP more than 60px restores them.
  // We use direction (not just position) so a small drift doesn't flicker.
  const [collapsed, setCollapsed] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (isMetricsAI) return // No collapse on the metrics-ai page
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const last = lastScrollY.current
        const delta = y - last
        if (y > 40 && delta > 0) {
          // scrolling down past threshold → collapse
          setCollapsed(true)
        } else if (delta < -60) {
          // scrolling up by more than 60px → expand
          setCollapsed(false)
        }
        lastScrollY.current = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMetricsAI])

  return (
    <div className="min-h-svh">
      {/* Reserved top space so content doesn't shift when the bar collapses.
          On /metrics-ai the layout is full-height chat, so skip the spacer. */}
      {!isMetricsAI && <div style={{ height: RESERVED_TOP_SPACE }} aria-hidden="true" className="hidden md:block" />}

      {/* PillNav + FilterBar: absolutely positioned so they can fade without
          affecting layout flow (the spacer above holds their seat). */}
      {!isMetricsAI && (
        <div
          className="fixed inset-x-0 top-0 z-40 transition-all duration-500"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: collapsed ? 0 : 1,
            transform: collapsed ? 'translateY(-12px)' : 'translateY(0)',
            pointerEvents: collapsed ? 'none' : 'auto',
          }}
        >
          <PillNav />
          <FilterBar />
        </div>
      )}

      {/* On /metrics-ai, PillNav is always visible at top, no collapse, no orb. */}
      {isMetricsAI && <PillNav />}

      <main
        className={
          isMetricsAI
            ? 'h-[calc(100svh-var(--nav-h))] overflow-hidden p-0'
            : 'flex flex-1 flex-col gap-6 p-4 md:p-8 lg:p-10'
        }
      >
        {children}
      </main>

      {/* Floating assistant — NOT on /metrics-ai (full assistant with its
          own scope picker already lives there; two chats on one page is a
          bug, not a feature). */}
      {!isMetricsAI && <FloatingAssistant />}
    </div>
  )
}
