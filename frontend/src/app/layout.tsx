import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './styles.css';
import ToastProvider from '@/components/providers/ToastProvider';
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

export const metadata: Metadata = generateSEO({
  title: 'Premium Web Development, AI Solutions & DevOps',
  description: 'Expert web development, AI automation, and cloud infrastructure. Build scalable applications with modern frameworks. Fast, reliable, and built to last.',
});

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
        <div className="relative min-h-screen bg-background">
          {/* Background gradient overlay - Softer */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/3" />
          
          {/* Grid background - More subtle */}
          <div className="fixed inset-0 -z-10 grid-background opacity-10" />
          
          {children}
          
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
