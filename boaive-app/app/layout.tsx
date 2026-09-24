import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';

export const metadata: Metadata = {
  title: 'Boaive Clinic — Dental, Hair & Skin Care in Mahalingapuram, Chennai',
  description: 'Neighbourhood clinic for dental, hair and skin care in Mahalingapuram, Chennai. Experienced doctors, honest advice, fair pricing. Book your appointment today.',
  openGraph: {
    title: 'Boaive Clinic — Dental, Hair & Skin Care',
    description: 'Experienced doctors, honest advice and fair pricing. Mahalingapuram, Chennai.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileActionBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
