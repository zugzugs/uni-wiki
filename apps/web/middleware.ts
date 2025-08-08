import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function resolveTenant(host: string | null): string | null {
  try {
    const map = JSON.parse(process.env.TENANT_DOMAIN_MAP || '{}') as Record<string, string>
    if (!host) return null
    const hostname = host.split(':')[0]
    return map[hostname] || null
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // If path already includes tenant, continue
  const pathParts = pathname.split('/').filter(Boolean)
  if (pathParts.length > 0 && pathParts[0] && pathParts[0] !== 'site') {
    return NextResponse.next()
  }

  const tenant = resolveTenant(request.headers.get('host'))
  if (tenant) {
    const url = request.nextUrl.clone()
    url.pathname = `/${tenant}${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}