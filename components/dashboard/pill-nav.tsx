'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
}

// Main pills always visible on desktop
const mainNav: NavItem[] = [
  { href: '/', label: 'Overview' },
  { href: '/programs', label: 'Programs' },
  { href: '/learners', label: 'Learners' },
  { href: '/feedback', label: 'Feedback' },
  { href: '/eligibility', label: 'Eligibility' },
  { href: '/extras', label: 'Quality' },
]

// Secondary pills collapsed into "More" dropdown
const moreNav: NavItem[] = [
  { href: '/all-learnings', label: 'All Learning' },
  { href: '/mandatory', label: 'Mandatory' },
  { href: '/skillup', label: 'SkillUp' },
  { href: '/metrics-ai', label: 'Metrics AI' },
]

const allNav = [...mainNav, ...moreNav]

export function PillNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Close mobile menu + More dropdown on route change
  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
  }, [pathname])

  // Click outside closes the More dropdown
  useEffect(() => {
    if (!moreOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && !target.closest('[data-more-menu]')) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [moreOpen])

  // ESC closes any open menu
  useEffect(() => {
    if (!mobileOpen && !moreOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setMoreOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen, moreOpen])

  const moreHasActive = moreNav.some((i) => isActive(i.href))

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pb-2 md:px-6">
      <nav
        className="glass-dark mx-auto flex w-full max-w-5xl items-center gap-1 rounded-full p-1.5"
        aria-label="Primary"
      >
        {/* Circular logo */}
        <Link
          href="/"
          className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-amber ring-2 ring-white/25 transition-transform duration-300 hover:scale-105 hover:rotate-3"
          aria-label="MAF Learning - Home"
        >
          <Image
            src="/logo.png"
            alt="MAF Learning"
            width={22}
            height={22}
            className="rounded-full object-cover"
            priority
          />
        </Link>

        {/* Desktop pills */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {mainNav.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'pill-link',
                    active ? 'is-active' : 'is-default'
                  )}
                >
                  <span className="pill-fill" aria-hidden="true" />
                  {active && <span className="pill-dot" aria-hidden="true" />}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            )
          })}

          {/* More dropdown */}
          <li className="relative" data-more-menu>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className={cn(
                'pill-link',
                moreHasActive ? 'is-active' : 'is-default'
              )}
            >
              <span className="pill-fill" aria-hidden="true" />
              {moreHasActive && <span className="pill-dot" aria-hidden="true" />}
              <span className="relative z-10 flex items-center gap-1">
                More
                <ChevronDown
                  className={cn(
                    'size-3 transition-transform duration-200',
                    moreOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </span>
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="glass-panel absolute right-0 top-full mt-2 w-56 rounded-2xl p-1.5 shadow-xl z-100"
              >
                {moreNav.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={cn(
                        'flex h-9 w-full items-center gap-2 rounded-full px-3 text-xs font-semibold uppercase tracking-wide transition-all duration-200',
                        active
                          ? 'bg-brand-gold text-white shadow-md shadow-brand-gold/30'
                          : 'text-foreground hover:bg-white/80 hover:-translate-y-px'
                      )}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="ml-auto flex size-9 items-center justify-center rounded-full text-sidebar-foreground transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-panel mx-auto mt-2 w-full max-w-5xl rounded-2xl p-2 md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {allNav.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex h-10 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-wide transition-all duration-200',
                    active
                      ? 'bg-brand-gold text-white shadow-md shadow-brand-gold/30'
                      : 'text-foreground hover:bg-white/60 hover:-translate-y-px'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
