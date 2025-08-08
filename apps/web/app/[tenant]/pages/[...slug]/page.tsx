import { prisma } from '@db'
import { notFound } from 'next/navigation'

interface Params {
  params: { tenant: string; slug: string[] }
}

async function getPage(tenantSlug: string, slugParts: string[]) {
  const slug = slugParts.join('/')
  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } })
  if (!tenant) return null
  return prisma.page.findFirst({
    where: { tenantId: tenant.id, slug },
    include: { game: { select: { title: true } } }
  })
}

import type { ReactNode } from 'react'

function renderNode(node: any): ReactNode {
  if (!node) return null
  switch (node.type) {
    case 'heading': {
      const level = node.attrs?.level ?? 2
      const Tag = `h${Math.min(Math.max(level, 1), 6)}` as any
      return <Tag className="mt-8 text-brand font-bold">{node.content?.map(renderNode)}</Tag>
    }
    case 'paragraph':
      return <p className="mt-4 leading-7 text-white/85">{node.content?.map(renderNode)}</p>
    case 'text':
      return node.text
    case 'bulletList':
      return <ul className="mt-4 list-disc pl-6">{node.content?.map(renderNode)}</ul>
    case 'listItem':
      return <li>{node.content?.map(renderNode)}</li>
    default:
      return null
  }
}

export default async function WikiPage({ params }: Params) {
  const page = await getPage(params.tenant, params.slug)
  if (!page) return notFound()

  const doc = (page.content as any) || { type: 'doc', content: [] }

  return (
    <div className="prose-invert prose prose-headings:font-extrabold prose-a:text-accent max-w-3xl px-6 py-10">
      <h1 className="text-4xl">{page.title}</h1>
      {doc.content?.map(renderNode)}
    </div>
  )
}