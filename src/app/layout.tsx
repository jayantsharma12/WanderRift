import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WandeRift',
  description: 'All trips, one platform—compare and book instantly!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}