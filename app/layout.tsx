import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.scss'

const spaceMono = Space_Mono({weight: "400", subsets:["latin"]})

export const metadata: Metadata = {
  title: 'Bill Splitter',
  description: 'Bill Splitting Quick Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>{children}</body>
    </html>
  )
}
