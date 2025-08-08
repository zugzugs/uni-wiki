import { ReactNode } from 'react'

export default function TenantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      {children}
    </div>
  )
}