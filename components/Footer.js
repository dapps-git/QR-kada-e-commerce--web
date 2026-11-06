import Link from 'next/link';
import Image from 'next/image';
import { site, waLink } from '@/data/site';
import { categories } from '@/data/products';
import { IconFacebook, IconInstagram, IconWhatsApp, IconPhone, IconPin, IconClock, IconArrowUpRight } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <div>
            <p className="eyebrow eyebrow--light">Bulk & franchise</p>
            <h2>Outfitting 10+ outlets?<br />Let’s talk volume pricing.</h2>
          </div>
          <a className="btn btn--light" href={waLink('Hi Qrkada, I want a bulk / franchise quote.')} target="_blank" rel="noreferrer">
            <IconWhatsApp size={18} /> Get a bulk quote
          </a>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Image src="/images/logo-light.png" alt="Qrkada" width={910} height={220} className="footer__logo" />
            <p>Smart QR &amp; NFC stands that connect your business to your customers. Designed and finished by hand in Kerala.</p>
            <div className="footer__social">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram size={18} /></a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook size={18} /></a>
              <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><IconWhatsApp size={18} /></a>
            </div>
          </div>

          <div>
            <h4>Shop</h4>
            <ul>
              {categories.map((c) => (
                <li key={c.id}><Link href={`/shop?c=${c.id}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Help</h4>
            <ul>
              <li><Link href="/track-order">Track my order</Link></li>
              <li><Link href="/#faq">FAQs</Link></li>
              <li><Link href="/policies/shipping">Shipping policy</Link></li>
              <li><Link href="/policies/refund">Refund &amp; returns</Link></li>
              <li><Link href="/policies/privacy">Privacy policy</Link></li>
              <li><Link href="/policies/terms">Terms of service</Link></li>
            </ul>
          </div>

          <div>
            <h4>Visit / call</h4>
            <ul className="footer__contact">
              <li><IconPin size={16} /> {site.location}</li>
              <li><IconPhone size={16} /> <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a></li>
              <li><IconClock size={16} /> {site.hours}</li>
              <li><Link href="/contact" className="link-arrow">Contact page <IconArrowUpRight size={14} /></Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Qrkada · {site.domain}</span>
          <span>Made with care in Valanchery, Kerala</span>
        </div>
      </div>
      <div className="footer__giant" aria-hidden="true">qrkada</div>
    </footer>
  );
}
