import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'EQIP | Enterprise Business Intelligence', template: '%s | EQIP' },
  description: 'Understand what your business does, preserve the rules your business depends on, and make consequential changes with evidence.',
  icons: { icon: '/eqip-symbol.png' },
  openGraph: {
    type: 'website',
    siteName: 'EQIP',
    title: 'Know your Business before it becomes a risk.',
    description: 'Business intelligence for organisations that cannot afford to guess.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
