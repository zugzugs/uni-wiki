import Link from 'next/link'
import { headers } from 'next/headers'

function getTenantFromHost(host: string | null): string {
  try {
    const map = JSON.parse(process.env.TENANT_DOMAIN_MAP || '{"localhost":"demo"}') as Record<string, string>
    if (!host) return map['localhost'] || 'demo'
    const hostname = host.split(':')[0]
    return map[hostname] || 'demo'
  } catch {
    return 'demo'
  }
}

export default function Home() {
  const host = headers().get('host')
  const tenant = getTenantFromHost(host)

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <section className="mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-brand to-accent">
          Universal Games Wiki
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          Multi-tenant, ultra-advanced, graphic wiki system for any game and any site. This is a demo instance.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={`/${tenant}/games/stellar-odyssey`} className="rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/30 hover:opacity-90 transition">
            View Demo Game
          </Link>
          <Link href={`/${tenant}/pages/stellar-odyssey/intro`} className="rounded-xl bg-accent px-5 py-3 font-semibold text-black hover:opacity-90 transition">
            Read Intro Page
          </Link>

          <Link href={`/${tenant}/games/world-of-warcraft`} className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 transition">
            World of Warcraft
          </Link>
          <Link href={`/${tenant}/pages/world-of-warcraft/intro`} className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 transition">
            WoW Intro
          </Link>

          <Link href={`/${tenant}/games/counter-strike-2`} className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 transition">
            Counter-Strike 2
          </Link>
          <Link href={`/${tenant}/pages/counter-strike-2/intro`} className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 transition">
            CS2 Intro
          </Link>

          <Link href={`/${tenant}/games/rocket-league`} className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 transition">
            Rocket League
          </Link>
          <Link href={`/${tenant}/pages/rocket-league/intro`} className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 transition">
            Rocket League Intro
          </Link>
        </div>
      </section>
    </main>
  )
}