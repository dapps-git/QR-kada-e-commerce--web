import Image from 'next/image';
import Link from 'next/link';
import { site, waLink } from '@/data/site';
import { IconArrow, IconBrush, IconShield, IconHand, IconWhatsApp } from '@/components/Icons';

export const metadata = {
  title: 'Our story',
  description: 'Qrkada designs and makes smart QR & NFC stands in Valanchery, Kerala.',
};

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Our story</p>
          <h1 className="h1 reveal">Small counters deserve big-brand tools.</h1>
          <p className="lead reveal" style={{ '--d': '100ms' }}>
            Qrkada started in Valanchery with a simple idea: the café, the salon and the mobile shop down the road
            should look as polished — and be as easy to review, pay and follow — as any big chain.
          </p>
        </div>
      </section>

      <section className="container">
        <div className="about-img reveal">
          <Image src="/images/studio.jpg" alt="Inside the Qrkada studio" fill sizes="100vw" priority />
        </div>
      </section>

      <section className="section">
        <div className="container values">
          {[
            [IconBrush, 'Designed for your brand', 'No generic templates. Every stand carries your logo, colours and name — and you approve the proof before we print.'],
            [IconShield, 'Built to last', 'Cast acrylic, real mirror-gold frames and quality NFC chips. Each piece is tested on iPhone and Android before it ships.'],
            [IconHand, 'People, not tickets', 'Questions go to a real person on WhatsApp. Need a link changed later? Just message us.'],
          ].map(([Icon, t, s], i) => (
            <div key={t} className="value reveal" style={{ '--d': `${i * 100}ms` }}>
              <span className="value__icon"><Icon size={24} /></span>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="campaign reveal">
          <Image src="/images/banner.jpg" alt="Qrkada — Smart QR. Bigger Business." width={1774} height={887} sizes="(max-width: 1200px) 100vw, 1200px" />
        </div>
      </section>

      <section className="section">
        <div className="container narrow center">
          <h2 className="h2 reveal">Let’s make your counter work harder.</h2>
          <p className="muted">Visit us at {site.location}, or start a chat.</p>
          <div className="row-gap row-gap--center">
            <Link href="/shop" className="btn btn--dark">Shop products <IconArrow size={18} /></Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn--outline"><IconWhatsApp size={18} /> WhatsApp us</a>
          </div>
        </div>
      </section>
    </>
  );
}
