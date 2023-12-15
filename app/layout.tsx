import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Economic Scholar Filter',
  description: 'Filter Scholar by Economic Journals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/search.svg" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
      <Footer/>
    </html>
  )
}
