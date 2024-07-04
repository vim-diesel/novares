import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NovaRes',
  description: "World's Leading Retreat and Workshop Management Platform!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
