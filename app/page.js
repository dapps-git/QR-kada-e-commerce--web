import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import StandArt from '@/components/StandArt';
import { products, categories, professions, testimonials } from '@/data/products';
import { site, waLink, formatINR } from '@/data/site';
import {
  IconArrow, IconBrush, IconWallet, IconTruck, IconShield, IconNfc, IconStar, IconWhatsApp,
  IconInstagram, IconPin, IconHand, IconChart, IconChevronDown, IconSparkle,
  IconCup, IconScissors, IconMedical, IconStore, IconDumbbell, IconBed,
} from '@/components/Icons';

const faqs = [
  { q: 'Do customers need an app to use the stand?', a: 'No. Every modern iPhone and Android phone reads NFC and QR codes from the camera. Customers tap or scan, and your link opens straight away.' },
  { q: 'Can I see the design before you print?', a: 'Yes — always. After you order, we send a design proof on WhatsApp with your logo, colours and links. We print only after you approve it.' },
  { q: 'What links can the QR / NFC open?', a: 'Anything with a link: Google review page, Instagram, WhatsApp chat, UPI payment, digital menu, website, Wi-Fi, location, or a digital business profile.' },
  { q: 'How does partial Cash on Delivery work?', a: `Pay ${formatINR(site.advanceAmount)} in advance to confirm the order and start design. Pay the remaining amount to the courier when it arrives.` },
  { q: 'If my link changes, do I need a new stand?', a: 'No. NFC chips can be re-programmed, and we can point your QR to a new link. Just message us on WhatsApp.' },
  { q: 'How long does delivery take?', a: 'Usually 3–5 working days after design approval in Kerala, and 5–8 days for the rest of India.' },
];

const profIcons = { cafe: IconCup, salon: IconScissors, clinic: IconMedical, retail: IconStore, gym: IconDumbbell, hotel: IconBed };

export default function Home() {
  const best = products.slice(0, 8);
  const featured = categories.slice(0, 4).map((c) => ({ ...c, sample: products.find((p) => p.category === c.id && !p.image) || products.find((p) => p.category === c.id) }));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light reveal"><span className="pulse-dot" /> Smart QR &amp; NFC · Made in Kerala</p>
            <h1 className="hero__title reveal" style={{ '--d': '80ms' }}>
              One tap.<br />
              <span className="hl">Five stars.</span><br />
              Bigger business.
            </h1>
            <p className="hero__lead reveal" style={{ '--d': '160ms' }}>
              Premium review, payment and social stands for your counter. Customers tap or scan — your Google
              review page, UPI or Instagram opens instantly. No app needed.
            </p>
            <div className="hero__ctas reveal" style={{ '--d': '240ms' }}>
              <Link href="/shop" className="btn btn--red btn--lg">Shop stands <IconArrow size={18} /></Link>
              <a href={waLink('Hi Qrkada, I want a custom QR stand for my business.')} target="_blank" rel="noreferrer" className="btn btn--ghost-light btn--lg">
                <IconWhatsApp size={18} /> Custom design
              </a>
            </div>
            <ul className="hero__points reveal" style={{ '--d': '320ms' }}>
              <li><IconBrush size={16} /> Free design proof</li>
              <li><IconWallet size={16} /> Pay {formatINR(site.advanceAmount)} now, rest on delivery</li>
            </ul>
          </div>

          <div className="hero__visual reveal" style={{ '--d': '120ms' }}>
            <div className="hero__frame">
              <Image src="/images/stand-hero.jpg" alt="Qrkada black and red NFC review stand on a marble counter" fill priority sizes="(max-width: 900px) 90vw, 46vw" />
              <span className="ripple" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="float-card float-card--a">
              <span className="float-card__icon"><IconStar size={16} /></span>
              <span><strong>Review page opened</strong><em>in 1 tap · no app</em></span>
            </div>
            <div className="float-card float-card--b">
              <span className="float-card__icon float-card__icon--dark"><IconNfc size={18} /></span>
              <span><strong>QR + NFC</strong><em>iPhone &amp; Android</em></span>
            </div>
            <div className="hero__price">
              <span>From</span>
              <strong>{formatINR(Math.min(...products.map((p) => p.price)))}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust">
        <div className="container trust__row">
          {[
            [IconBrush, 'Free design proof', 'Approve on WhatsApp first'],
            [IconWallet, 'Partial COD', `Just ${formatINR(site.advanceAmount)} to confirm`],
            [IconTruck, 'Pan-India shipping', `Free above ${formatINR(site.freeShippingAbove)}`],
            [IconShield, 'Re-programmable', 'Change links anytime'],
          ].map(([Icon, t, s], i) => (
            <div key={t} className="trust__item reveal" style={{ '--d': `${i * 70}ms` }}>
              <span className="trust__icon"><Icon size={22} /></span>
              <span><strong>{t}</strong><em>{s}</em></span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Collections</p>
              <h2 className="h2 reveal">Pick what your counter needs</h2>
            </div>
            <Link href="/shop" className="link-arrow">View all products <IconArrow size={16} /></Link>
          </div>
          <div className="cats">
            {featured.map((c, i) => (
              <Link key={c.id} href={`/shop?c=${c.id}`} className={`cat reveal theme-${c.sample?.art?.theme}`} style={{ '--d': `${i * 80}ms` }}>
                <span className="cat__art"><StandArt art={c.sample?.art} id={'cat' + c.id} /></span>
                <span className="cat__text">
                  <strong>{c.name}</strong>
                  <em>{c.blurb}</em>
                </span>
                <span className="cat__go"><IconArrow size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Bestsellers</p>
              <h2 className="h2 reveal">Loved on counters across Kerala</h2>
            </div>
            <Link href="/shop" className="link-arrow">Shop all <IconArrow size={16} /></Link>
          </div>
          <div className="grid-products">
            {best.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how">
        <div className="container">
          <div className="section__head section__head--center">
            <p className="eyebrow">How it works</p>
            <h2 className="h2 reveal">From order to first review in a week</h2>
          </div>
          <ol className="how__steps">
            {[
              [IconSparkle, 'Choose your stand', 'Pick a style and tell us your links — Google review, UPI, Instagram, WhatsApp.'],
              [IconBrush, 'Approve the design', 'We send a proof with your logo and colours on WhatsApp. Edits are free.'],
              [IconHand, 'Tap, scan, grow', 'Place it at billing. Customers tap their phone and review, pay or follow in seconds.'],
            ].map(([Icon, t, s], i) => (
              <li key={t} className="how__step reveal" style={{ '--d': `${i * 120}ms` }}>
                <span className="how__num">0{i + 1}</span>
                <span className="how__icon"><Icon size={24} /></span>
                <h3>{t}</h3>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CAMPAIGN BANNER */}
      <section className="container">
        <Link href="/shop" className="campaign reveal">
          <Image src="/images/banner.jpg" alt="Qrkada — Smart QR. Bigger Business. Smart QR & NFC stands." width={1774} height={887} sizes="(max-width: 1200px) 100vw, 1200px" />
        </Link>
      </section>

      {/* PROFESSIONS */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Shop by business</p>
              <h2 className="h2 reveal">Made for the way you work</h2>
            </div>
          </div>
          <div className="profs">
            {professions.map((p, i) => {
              const Icon = profIcons[p.id];
              return (
              <Link key={p.id} href={`/shop?p=${p.id}`} className="prof reveal" style={{ '--d': `${i * 50}ms` }}>
                <span className="prof__glyph"><Icon size={22} /></span>
                <strong>{p.name}</strong>
                <IconArrow size={16} />
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section section--dark why">
        <div className="container why__inner">
          <div className="why__copy">
            <p className="eyebrow eyebrow--light">Why a smart stand</p>
            <h2 className="h2 reveal">Happy customers rarely leave reviews. Unless you make it effortless.</h2>
            <p className="why__lead reveal">
              Asking for a review takes a second. Finding your page on Google takes a minute — and most people give up.
              A Qrkada stand removes that minute.
            </p>
            <Link href="/shop?c=review-stands" className="btn btn--red reveal">Explore review stands <IconArrow size={18} /></Link>
          </div>
          <div className="why__cards">
            {[
              [IconChart, 'More reviews, better ranking', 'More recent reviews help you show up higher on Google Maps.'],
              [IconNfc, 'Tap or scan — both work', 'NFC for new phones, a QR code for everything else.'],
              [IconWallet, 'One counter, every link', 'Payment, review, Instagram and WhatsApp on one stand.'],
            ].map(([Icon, t, s], i) => (
              <div key={t} className="why__card reveal" style={{ '--d': `${i * 100}ms` }}>
                <Icon size={22} />
                <h3>{t}</h3>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section className="section">
        <div className="container studio">
          <div className="studio__img reveal">
            <Image src="/images/studio.jpg" alt="Qrkada studio interior with display shelves of QR stands" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="studio__copy">
            <p className="eyebrow">Our studio</p>
            <h2 className="h2 reveal">Designed, printed and checked by hand in Valanchery.</h2>
            <p className="reveal">
              Every stand is cut from cast acrylic, printed, fitted with its NFC chip and tested on both iPhone and Android before it ships.
              Drop by to see the finishes in person, or send us a message — we reply fast.
            </p>
            <ul className="studio__facts reveal">
              <li><IconPin size={18} /> {site.location}</li>
              <li><IconWhatsApp size={18} /> {site.phoneDisplay}</li>
            </ul>
            <div className="row-gap">
              <Link href="/about" className="btn btn--dark">Our story <IconArrow size={18} /></Link>
              <Link href="/contact" className="btn btn--outline">Visit us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — appear once you add real reviews in data/products.js */}
      {testimonials.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <div className="section__head section__head--center">
              <p className="eyebrow">Customer words</p>
              <h2 className="h2 reveal">What shop owners say</h2>
            </div>
            <div className="quotes">
              {testimonials.map((t, i) => (
                <figure key={i} className="quote reveal" style={{ '--d': `${i * 80}ms` }}>
                  <div className="stars">{Array.from({ length: 5 }).map((_, k) => <IconStar key={k} size={14} filled={k < t.rating} />)}</div>
                  <blockquote>{t.text}</blockquote>
                  <figcaption><strong>{t.name}</strong><span>{t.place}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section section--tint" id="faq">
        <div className="container faq">
          <div className="faq__intro">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 reveal">Questions, answered</h2>
            <p className="muted">Still unsure? We’re one message away.</p>
            <a href={waLink('Hi Qrkada, I have a question.')} className="btn btn--outline" target="_blank" rel="noreferrer">
              <IconWhatsApp size={18} /> Ask on WhatsApp
            </a>
          </div>
          <div className="faq__list">
            {faqs.map((f, i) => (
              <details key={i} className="faq__item reveal" style={{ '--d': `${i * 50}ms` }} open={i === 0}>
                <summary>{f.q}<IconChevronDown size={18} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="section insta">
        <div className="container insta__inner reveal">
          <span className="insta__icon"><IconInstagram size={28} /></span>
          <div>
            <h2 className="h3">See real stands on real counters</h2>
            <p className="muted">New designs and customer installs every week on @qr.kada</p>
          </div>
          <a className="btn btn--dark" href={site.social.instagram} target="_blank" rel="noreferrer">Follow @qr.kada <IconArrow size={18} /></a>
        </div>
      </section>
    </>
  );
}
