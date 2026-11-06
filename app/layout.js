import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteEffects from '@/components/SiteEffects';
import { site } from '@/data/site';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700', '800'] });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Qrkada — Smart QR & NFC Stands for Your Business', template: '%s · Qrkada' },
  description: site.description,
  keywords: ['QR stand', 'NFC stand', 'Google review stand', 'UPI QR stand', 'NFC business card', 'Kerala', 'Qrkada'],
  openGraph: {
    title: 'Qrkada — Smart QR. Bigger Business.',
    description: site.description,
    url: site.url,
    siteName: 'Qrkada',
    images: [{ url: '/images/banner.jpg', width: 1774, height: 887 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/images/banner.jpg'] },
};

export const viewport = { themeColor: '#0b0b0c' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Qrkada',
  url: site.url,
  telephone: '+91' + site.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Valanchery', addressRegion: 'Kerala', addressCountry: 'IN' },
  sameAs: [site.social.instagram, site.social.facebook],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <SiteEffects />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
