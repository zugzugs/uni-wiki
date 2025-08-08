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

  // World of Warcraft
  const wow = await prisma.game.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'world-of-warcraft' } },
    update: {},
    create: {
      tenantId: tenant.id,
      slug: 'world-of-warcraft',
      title: 'World of Warcraft',
      summary: 'A massively multiplayer online role-playing game set in the world of Azeroth.',
      coverUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2400&auto=format&fit=crop',
      developers: ['Blizzard Entertainment'],
      publishers: ['Blizzard Entertainment'],
      platforms: ['PC'],
      genres: ['MMORPG', 'Fantasy'],
      releaseDate: new Date('2004-11-23')
    }
  })

  await prisma.page.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'world-of-warcraft/intro' } },
    update: {},
    create: {
      tenantId: tenant.id,
      gameId: wow.id,
      slug: 'world-of-warcraft/intro',
      title: 'Introduction',
      summary: 'Start here to learn the basics of World of Warcraft.',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Welcome to World of Warcraft' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'This wiki covers classes, professions, raids, and more.' }] },
          { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'New Player Guide' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Leveling Tips' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Dungeons & Raids' }] }] }
          ]}
        ]
      }
    }
  })

  // Counter-Strike 2
  const cs2 = await prisma.game.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'counter-strike-2' } },
    update: {},
    create: {
      tenantId: tenant.id,
      slug: 'counter-strike-2',
      title: 'Counter-Strike 2',
      summary: 'The next era of tactical FPS built on the Source 2 engine.',
      coverUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1600&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2400&auto=format&fit=crop',
      developers: ['Valve'],
      publishers: ['Valve'],
      platforms: ['PC'],
      genres: ['FPS', 'Shooter'],
      releaseDate: new Date('2023-09-27')
    }
  })

  await prisma.page.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'counter-strike-2/intro' } },
    update: {},
    create: {
      tenantId: tenant.id,
      gameId: cs2.id,
      slug: 'counter-strike-2/intro',
      title: 'Introduction',
      summary: 'Start here to learn the basics of CS2.',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Welcome to Counter-Strike 2' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'This wiki covers maps, weapons, economy, and competitive play.' }] },
          { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Beginner Loadouts' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Map Callouts' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Economy Guide' }] }] }
          ]}
        ]
      }
    }
  })

  // Rocket League
  const rl = await prisma.game.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'rocket-league' } },
    update: {},
    create: {
      tenantId: tenant.id,
      slug: 'rocket-league',
      title: 'Rocket League',
      summary: 'High-powered hybrid of arcade soccer and vehicular mayhem!',
      coverUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2400&auto=format&fit=crop',
      developers: ['Psyonix'],
      publishers: ['Psyonix'],
      platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
      genres: ['Sports', 'Action', 'Racing'],
      releaseDate: new Date('2015-07-07')
    }
  })

  await prisma.page.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: 'rocket-league/intro' } },
    update: {},
    create: {
      tenantId: tenant.id,
      gameId: rl.id,
      slug: 'rocket-league/intro',
      title: 'Introduction',
      summary: 'Start here to learn the basics of Rocket League.',
      content: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Welcome to Rocket League' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'This wiki covers car presets, mechanics, and ranked play.' }] },
          { type: 'bulletList', content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Beginner Mechanics' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Positioning Basics' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Training Packs' }] }] }
          ]}
        ]
      }
    }
  })
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e)
  process.exit(1)
})