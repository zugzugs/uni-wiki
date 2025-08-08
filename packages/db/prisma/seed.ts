import { prisma } from '../src/index'

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      slug: 'demo',
      name: 'Demo Gamepedia',
      primaryDomain: 'localhost',
      themeJson: { brandColor: '#8b5cf6', accentColor: '#22d3ee' }
    }
  })

  const game = await prisma.game.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'stellar-odyssey' } },
    update: {},
    create: {
      tenantId: tenant.id,
      slug: 'stellar-odyssey',
      title: 'Stellar Odyssey',
      summary: 'An epic space exploration RPG with deep lore and emergent gameplay.',
      developers: ['Nebula Forge Studios'],
      publishers: ['Asteria Interactive'],
      platforms: ['PC', 'PS5', 'Xbox Series X|S'],
      genres: ['RPG', 'Open World', 'Sci-Fi']
    }
  })

  await prisma.page.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'stellar-odyssey/intro' } },
    update: {},
    create: {
      tenantId: tenant.id,
      gameId: game.id,
      slug: 'stellar-odyssey/intro',
      title: 'Introduction',
      summary: 'Start here to learn the basics of Stellar Odyssey.',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Welcome to Stellar Odyssey' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'This wiki covers mechanics, lore, and guides.' }] }
        ]
      }
    }
  })
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e)
  process.exit(1)
})