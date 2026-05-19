import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forza Horizon 6 - Car Database',
  description: 'Premium interactive car database for Forza Horizon 6 with advanced filtering, comparison, and performance visualization.',
  keywords: ['Forza', 'Horizon', 'Cars', 'Database', 'Gaming'],
  authors: [{ name: 'ForzaData' }],
  openGraph: {
    title: 'Forza Horizon 6 - Car Database',
    description: 'Explore and compare cars from Forza Horizon 6 with detailed specs and performance stats.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%2300D9FF'>🏎️</text></svg>" />
      </head>
      <body className="bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
