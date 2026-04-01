import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Nav from '@/components/Nav';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

const monumentBlack = localFont({
  src: '../public/fonts/PPMonumentExtended-Black.otf',
  variable: '--font-monument-black',
  display: 'swap',
});

const monumentRegular = localFont({
  src: '../public/fonts/PPMonumentExtended-Regular.otf',
  variable: '--font-monument-regular',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Anne Zeng',
  description: 'Photography portfolio by Anne Zeng, based in Toronto.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  icons: {
    icon: '/az-logo.png',
    apple: '/az-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable + ' ' + monumentBlack.variable + ' ' + monumentRegular.variable}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}