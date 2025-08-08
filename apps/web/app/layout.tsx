import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

export const metadata = {
  title: 'Universal Games Wiki',
  description: 'Ultra-advanced, multi-tenant, graphic wiki for games.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white bg-radial-glow">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative">
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
              <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vw] -translate-x-1/2 rounded-full blur-3xl" style={{
                background: 'conic-gradient(from 180deg at 50% 50%, rgba(124,58,237,0.5), rgba(34,211,238,0.5), rgba(124,58,237,0.5))'
              }} />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}