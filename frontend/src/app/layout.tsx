import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './styles.css';
import ToastProvider from '@/components/providers/ToastProvider';
import ChatWidget from '@/components/layout/ChatWidget';
import { generateSEO, generateStructuredData } from '@/lib/seo';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iitdeveloper.com'),
  ...generateSEO({
    title: 'Premium Web Development, AI Solutions & DevOps',
    description: 'Expert web development, AI automation, and cloud infrastructure. Build scalable applications with modern frameworks. Fast, reliable, and built to last.',
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateStructuredData('Organization');
  const websiteSchema = generateStructuredData('WebSite');

  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#0b1a2b" />
        <meta name="color-scheme" content="dark" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7VZRZJC8C8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7VZRZJC8C8');
          `}
        </Script>
        <div className="relative min-h-screen bg-background">
          {/* Background gradient overlay - Softer */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/3" />
          
          {/* Grid background - More subtle */}
          <div className="fixed inset-0 -z-10 grid-background opacity-10" />
          
          {children}
          
          <ChatWidget />
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
