import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass-card flex flex-col items-center gap-6 rounded-3xl p-10">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="MAF Learning Logo"
            width={48}
            height={48}
            className="rounded-lg"
            priority
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-foreground">MAF Learning</h1>
            <p className="text-xs text-muted-foreground">L&D DASHBOARD</p>
          </div>
        </div>
        
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-foreground">Loading dashboard</p>
            <p className="text-xs text-muted-foreground">Please wait while we prepare your data...</p>
          </div>

          {/* Animated loading spinner */}
          <div className="mt-4 flex gap-1.5">
            <div className="size-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '0s' }} />
            <div className="size-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '0.1s' }} />
            <div className="size-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
