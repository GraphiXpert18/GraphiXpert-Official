import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiXpert - Digital Services',
  description: 'Web Design, App Development, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
