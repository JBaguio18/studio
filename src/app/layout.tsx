import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { MotionDiv } from '@/components/motion-div';

export const metadata: Metadata = {
  title: 'PLXYGROUND',
  description: 'The premier platform for sports creator content.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <MotionDiv
              tag="main"
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {children}
            </MotionDiv>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
