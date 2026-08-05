'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const REVEAL_MS = 1900
const EXIT_MS = 700

export function Preloader() {
  const [phase, setPhase] = useState<'reveal' | 'exit' | 'done'>('reveal')

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setPhase('exit'), REVEAL_MS)
    const doneTimer = window.setTimeout(() => setPhase('done'), REVEAL_MS + EXIT_MS)
    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    // Prevent scrolling behind the overlay while it is visible
    if (phase === 'done') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading MAF L&D Lens"
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-sidebar ${
        phase === 'exit' ? 'animate-preloader-exit' : ''
      }`}
    >
      {/* Soft brand glow so the white mark reads clearly on the dark ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute size-[36rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--brand-gold) 45%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with bottom-to-top clip reveal plus a gold light sweep */}
        <div className="relative animate-preloader-reveal">
          <Image
            src="/logo.png"
            alt="Majid Al Futtaim"
            width={132}
            height={148}
            priority
            className="h-auto w-24 drop-shadow-[0_0_28px_rgba(180,151,90,0.55)] md:w-28"
          />
          <div
            aria-hidden
            className="animate-preloader-sweep pointer-events-none absolute inset-x-[-25%] top-0 h-1/3"
            style={{
              background:
                'linear-gradient(to bottom, transparent, color-mix(in oklab, var(--brand-gold) 70%, transparent), transparent)',
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="animate-preloader-rise text-sm font-semibold tracking-[0.32em] text-white opacity-0 [animation-delay:700ms]">
            MAF L&amp;D LENS
          </p>
          <p className="animate-preloader-rise text-[11px] tracking-[0.18em] text-sidebar-foreground/70 opacity-0 [animation-delay:900ms]">
            DBU &amp; AMBU DASHBOARD
          </p>

          <div className="mt-2 h-px w-44 overflow-hidden bg-white/15">
            <div className="animate-preloader-bar h-full w-0 bg-[var(--brand-gold)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
