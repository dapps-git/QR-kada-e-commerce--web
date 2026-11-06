'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from './CartProvider';
import { waLink } from '@/data/site';
import { IconCheck, IconWhatsApp, IconArrow } from './Icons';

// Scroll-reveal for any element with class "reveal"
function useReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    const scan = () => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
      if (!seen.has(el)) { seen.add(el); io.observe(el); }
    });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);
}

export default function SiteEffects() {
  useReveal();
  const { toast } = useCart();
  return (
    <>
      <div className={`toast ${toast ? 'is-on' : ''}`} role="status" aria-live="polite">
        {toast && (
          <>
            <span className="toast__icon"><IconCheck size={16} /></span>
            <span className="toast__text"><strong>Added to cart</strong><em>{toast.name}</em></span>
            <Link href="/cart" className="toast__link">View cart <IconArrow size={14} /></Link>
          </>
        )}
      </div>
      <a
        className="wa-float"
        href={waLink('Hi Qrkada! I have a question about your QR stands.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <IconWhatsApp size={26} />
        <span className="wa-float__label">Chat with us</span>
      </a>
    </>
  );
}
