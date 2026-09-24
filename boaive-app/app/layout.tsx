import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingCustomizer from '@/components/FloatingCustomizer';

export const metadata: Metadata = {
  title: 'Boaive Clinic — Modern Care. Made Personal.',
  description: 'Advanced dental, hair and skin care designed around you. Book your appointment today.',
  openGraph: {
    title: 'Boaive Clinic — Modern Care. Made Personal.',
    description: 'Advanced dental, hair and skin care designed around you.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <FloatingCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
