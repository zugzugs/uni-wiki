import { prisma } from '@db'
import Image from 'next/image'
import Link from 'next/link'

interface Params {
  params: { tenant: string; slug: string }
}

async function getGame(tenantSlug: string, gameSlug: string) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } })
  if (!tenant) return null
  return prisma.game.findFirst({
    where: { tenantId: tenant.id, slug: gameSlug },
    include: { pages: { select: { slug: true, title: true } } }
  })
}

export default async function GamePage({ params }: Params) {
  const game = await getGame(params.tenant, params.slug)
  if (!game) return <div className="p-8">Game not found.</div>

  return (
    <div className="px-6 py-10">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand/40 to-accent/40">
        {game.bannerUrl && (
          <Image src={game.bannerUrl} alt={game.title} fill className="object-cover opacity-60" />
        )}
        <div className="absolute inset-0 flex items-end p-6">
          <h1 className="text-4xl font-bold">{game.title}</h1>
        </div>
      </div>
      {game.summary && <p className="mt-6 max-w-3xl text-white/80">{game.summary}</p>}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Pages</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {game.pages.map((p) => (
            <li key={p.slug} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
              <Link href={`/${params.tenant}/pages/${p.slug}`} className="font-medium">{p.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}