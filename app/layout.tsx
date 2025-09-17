import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Model Explorer',
  description: 'Explore and compare AI models from various providers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}