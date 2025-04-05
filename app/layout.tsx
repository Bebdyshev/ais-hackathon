import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Qatysu aishack',
  description: 'aishack',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
