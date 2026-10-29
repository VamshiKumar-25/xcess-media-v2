
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://xcessmedia.in'),


title: {
  default: 'Xcess Media | Digital Marketing Agency in Bengaluru & Gangavathi',
  template: '%s | Xcess Media',
},
description:
  'Xcess Media helps businesses in Bengaluru and Gangavathi grow through social media marketing, creative content, website development, Local SEO and paid advertising.',


  applicationName: 'Xcess Media',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  
openGraph: {
  type: 'website',
  url: 'https://xcessmedia.in/',
  siteName: 'Xcess Media',
  title: 'Xcess Media | Digital Marketing Agency in Bengaluru & Gangavathi',
  description:
    'Xcess Media helps businesses in Bengaluru and Gangavathi grow through social media marketing, creative content, website development, Local SEO and paid advertising.',
  locale: 'en_IN',
},
twitter: {
  card: 'summary_large_image',
  title: 'Xcess Media | Digital Marketing Agency in Bengaluru & Gangavathi',
  description:
    'Xcess Media helps businesses in Bengaluru and Gangavathi grow through social media marketing, creative content, website development, Local SEO and paid advertising.',
},


  generator: 'Xcess Media',

  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },

  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
  themeColor: '#050505',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://xcessmedia.in/#organization',
      name: 'Xcess Media',
      url: 'https://xcessmedia.in/',
      description:
        'Digital marketing and creative services for restaurants, interior design businesses and growing brands.',
      sameAs: ['https://www.instagram.com/xcessmedia.in/'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://xcessmedia.in/#website',
      name: 'Xcess Media',
      url: 'https://xcessmedia.in/',
      publisher: {
        '@id': 'https://xcessmedia.in/#organization',
      },
      inLanguage: 'en-IN',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}
