import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import Navigation from './components/global/Navigation'
import { CookiesProvider } from 'react-cookie'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tutor web site',
  description: 'In this web site you can .....',
  icons: "/icons/logo.svg",
  openGraph: {
    title: "website to buy and study new courses as online",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, consequuntur."
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
