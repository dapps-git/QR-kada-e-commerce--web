import { site, waLink } from '@/data/site';
import ContactForm from './ContactForm';
import { IconPhone, IconWhatsApp, IconPin, IconClock, IconInstagram, IconFacebook, IconArrowUpRight } from '@/components/Icons';

export const metadata = {
  title: 'Contact',
  description: `Call or WhatsApp Qrkada on ${site.phoneDisplay}. Studio in ${site.location}.`,
};

export default function Contact() {
  const cards = [
    { Icon: IconWhatsApp, t: 'WhatsApp', v: site.phoneDisplay, href: waLink('Hi Qrkada!'), ext: true, accent: true },
    { Icon: IconPhone, t: 'Call us', v: site.phoneDisplay, href: `tel:+91${site.phone}` },
    { Icon: IconInstagram, t: 'Instagram', v: '@qr.kada', href: site.social.instagram, ext: true },
    { Icon: IconFacebook, t: 'Facebook', v: 'Qrkada', href: site.social.facebook, ext: true },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="h1 reveal">Talk to a real person.</h1>
          <p className="muted page-hero__sub">Questions, custom designs or bulk orders — we usually reply within the hour during working time.</p>
        </div>
      </section>

      <section className="container contact">
        <div className="contact__cards">
          {cards.map(({ Icon, t, v, href, ext, accent }, i) => (
            <a key={t} href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined} className={`ccard reveal ${accent ? 'ccard--accent' : ''}`} style={{ '--d': `${i * 70}ms` }}>
              <span className="ccard__icon"><Icon size={22} /></span>
              <span><em>{t}</em><strong>{v}</strong></span>
              <IconArrowUpRight size={18} className="ccard__go" />
            </a>
          ))}
          <div className="ccard ccard--static reveal">
            <span className="ccard__icon"><IconPin size={22} /></span>
            <span><em>Studio</em><strong>{site.location}</strong></span>
          </div>
          <div className="ccard ccard--static reveal">
            <span className="ccard__icon"><IconClock size={22} /></span>
            <span><em>Hours</em><strong>{site.hours}</strong></span>
          </div>
        </div>

        <div className="contact__form reveal">
          <h2 className="h3">Send a message</h2>
          <p className="muted small">This opens WhatsApp with your message ready to send.</p>
          <ContactForm />
        </div>
      </section>

      <section className="container section--sm">
        <div className="map reveal">
          <iframe
            title="Qrkada location — Valanchery, Kerala"
            src="https://www.google.com/maps?q=Valanchery,Kerala&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
