'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from './CartProvider';
import { announcements, formatINR } from '@/data/site';
import { products, categories } from '@/data/products';
import StandArt from './StandArt';
import { IconBag, IconBox, IconClose, IconMenu, IconSearch, IconArrow } from './Icons';

const NAV = [
  { href: '/shop', label: 'Shop all' },
  { href: '/shop?c=review-stands', label: 'Review Stands' },
  { href: '/shop?c=payment-stands', label: 'Payment Stands' },
  { href: '/shop?c=nfc-cards', label: 'NFC Cards' },
  { href: '/shop?c=bundles', label: 'Bundles' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { count, bump } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setMenu(false); setSearch(false); }, [pathname]);

  useEffect(() => {
    if (search) setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = menu || search ? 'hidden' : '';
    const esc = (e) => e.key === 'Escape' && (setSearch(false), setMenu(false));
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [search, menu]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.slice(0, 4);
    return products
      .filter((p) => (p.name + ' ' + p.short + ' ' + p.category).toLowerCase().includes(s))
      .slice(0, 6);
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
    setSearch(false);
  };

  return (
    <>
      <div className="announce" role="region" aria-label="Offers">
        <div className="announce__track">
          {[...announcements, ...announcements].map((a, i) => (
            <span key={i}>
              <i className="announce__dot" /> {a}
            </span>
          ))}
        </div>
      </div>

      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__row">
          <button className="icon-btn header__burger" aria-label="Open menu" onClick={() => setMenu(true)}>
            <IconMenu size={22} />
          </button>

          <Link href="/" className="header__logo" aria-label="Qrkada home">
            <Image src="/images/logo.png" alt="Qrkada" width={910} height={220} priority />
          </Link>

          <nav className="header__nav" aria-label="Main">
            {NAV.map((n) => {
              const active = n.href === pathname || (n.href === '/shop' && pathname === '/shop');
              return (
                <Link key={n.href} href={n.href} className={`nav-link ${active ? 'is-active' : ''}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="header__actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}>
              <IconSearch size={21} />
            </button>
            <Link href="/track-order" className="icon-btn hide-sm" aria-label="Track your order" title="Track order">
              <IconBox size={21} />
            </Link>
            <Link href="/cart" className="icon-btn cart-btn" aria-label={`Cart, ${count} items`}>
              <IconBag size={22} />
              <span key={bump} className={`cart-btn__count ${count ? 'is-on' : ''} ${bump ? 'bump' : ''}`}>{count}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`sheet ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        <div className="sheet__backdrop" onClick={() => setMenu(false)} />
        <aside className="sheet__panel">
          <div className="sheet__head">
            <Image src="/images/logo.png" alt="Qrkada" width={910} height={220} className="sheet__logo" />
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenu(false)}><IconClose size={22} /></button>
          </div>
          <nav className="sheet__nav">
            {NAV.map((n, i) => (
              <Link key={n.href} href={n.href} style={{ '--i': i }}>
                {n.label} <IconArrow size={18} />
              </Link>
            ))}
            <Link href="/track-order" style={{ '--i': NAV.length }}>Track order <IconArrow size={18} /></Link>
          </nav>
          <p className="sheet__foot">Designed &amp; made in Kerala.</p>
        </aside>
      </div>

      {/* Search overlay */}
      <div className={`search ${search ? 'is-open' : ''}`} aria-hidden={!search}>
        <div className="search__backdrop" onClick={() => setSearch(false)} />
        <div className="search__panel container">
          <form onSubmit={submit} className="search__form">
            <IconSearch size={22} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search stands, NFC cards, tags…"
              aria-label="Search products"
            />
            <button type="button" className="icon-btn" aria-label="Close search" onClick={() => setSearch(false)}>
              <IconClose size={20} />
            </button>
          </form>
          <div className="search__chips">
            {categories.map((c) => (
              <Link key={c.id} href={`/shop?c=${c.id}`} className="chip">{c.name}</Link>
            ))}
          </div>
          <p className="search__label">{q ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular right now'}</p>
          <div className="search__results">
            {results.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="search__item">
                <span className="search__thumb">
                  {p.image ? <Image src={p.image} alt="" width={80} height={80} /> : <StandArt art={p.art} id={'s' + p.slug} />}
                </span>
                <span>
                  <strong>{p.name}</strong>
                  <em>{formatINR(p.price)}</em>
                </span>
              </Link>
            ))}
            {q && !results.length && <p className="muted">Nothing found — try “stand”, “card” or “tag”.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
