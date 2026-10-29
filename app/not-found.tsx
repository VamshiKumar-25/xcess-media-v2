
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 py-16 text-white">
      {/* Subtle background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'linear-gradient(to bottom, black, transparent 85%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/15 pb-6">
          <Link href="/" aria-label="Xcess Media home">
            <Image
                src="/images/xcess-media-logo.svg"
                alt="Xcess Media"
                width={180}
                height={50}
                priority
                className="h-auto w-[150px] sm:w-[180px]"
            />
            </Link>

          <span className="text-xs font-medium tracking-[0.2em] text-neutral-400">
            ERROR / 404
          </span>
        </header>

        {/* Main content */}
        <section className="grid min-h-[65vh] items-center gap-8 py-16 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-500 sm:text-sm">
              <span className="h-px w-8 bg-red-500" />
              Lost in the digital space?
            </p>

            <h1 className="max-w-3xl text-4xl font-bold uppercase leading-[1.08] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl">
              This page
              <br />
              didn&apos;t make
              <br />
              <span className="text-neutral-500">the cut.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
              Looks like this link missed its mark. The page may have
              moved, or the URL might be incorrect. Let&apos;s get you
              back to something worth exploring.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
              >
                <span aria-hidden="true">←</span>
                Back to homepage
              </Link>

              <Link
                href="/#contact"
                className="text-sm text-neutral-300 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* Oversized 404 graphic */}
          <div
            aria-hidden="true"
            className="relative flex select-none items-center justify-center py-4 md:py-0"
          >
            <div className="absolute h-48 w-48 rounded-full bg-red-600/10 blur-3xl sm:h-64 sm:w-64" />

            <span className="relative text-[clamp(9rem,25vw,18rem)] font-bold leading-none tracking-[-0.12em] text-white/[0.06]">
              404
            </span>

            <span className="absolute text-6xl font-bold tracking-[-0.08em] text-red-500 sm:text-8xl">
              404<span className="text-white">.</span>
            </span>

            <span className="absolute bottom-0 right-0 text-[10px] uppercase tracking-[0.25em] text-neutral-600 md:bottom-8">
              Page not found
            </span>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-3 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.16em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <span>Strategy. Creativity. Digital Growth.</span>
          <span>© {new Date().getFullYear()} Xcess Media</span>
        </footer>
      </div>
    </main>
  )
}
