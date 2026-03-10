import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata: Metadata = {
  title: 'MedFlow - AI-Powered Pharmacy Dashboard',
  description: 'Modern pharmacy management system with AI capabilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-theme">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
