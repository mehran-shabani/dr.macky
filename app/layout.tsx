import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const iranSansX = Vazirmatn({
  subsets: ['latin', 'arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-iran-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'وبلاگ علمی',
    template: '%s | وبلاگ علمی',
  },
  description: 'آخرین یافته‌های علمی در حوزه فناوری، علوم پایه، زیست‌شناسی و محیط‌زیست',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'وبلاگ علمی',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: 'وبلاگ علمی',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="وبلاگ علمی" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${iranSansX.variable} font-sans antialiased touch-manipulation`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                      console.log('SW registered: ', registration);
                    },
                    (error) => {
                      console.log('SW registration failed: ', error);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
