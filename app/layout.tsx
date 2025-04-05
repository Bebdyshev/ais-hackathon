import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PointsProvider } from '@/context/points-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Student Attendance System',
  description: 'Track and manage student attendance with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PointsProvider>
          {children}
        </PointsProvider>
      </body>
    </html>
  )
}
