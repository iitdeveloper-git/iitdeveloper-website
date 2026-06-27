import type { Metadata } from 'next';
import './globals.css';
import ToastProvider from '@/components/providers/ToastProvider';
import { generateSEO, organizationSchema, websiteSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import AnalyticsProvider from '@/components/providers/AnalyticsProvider';
import { Suspense } from 'react';

export const metadata: Metadata = generateSEO({
  description: 'IITDEVELOPER helps startups and growing businesses build AI-powered products, reliable cloud platforms, custom software, and search-ready digital experiences.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="font-sans antialiased">
        <div className="relative min-h-screen bg-background">
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/3" />
          <div className="fixed inset-0 -z-10 grid-background opacity-10" />
          
          {children}
          <Suspense fallback={null}><AnalyticsProvider /></Suspense>
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
