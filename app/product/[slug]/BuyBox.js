'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { waLink, formatINR } from '@/data/site';
import { IconMinus, IconPlus, IconBag, IconWhatsApp } from '@/components/Icons';

export default function BuyBox({ product }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [biz, setBiz] = useState('');
  const [added, setAdded] = useState(false);

  const note = biz.trim();

  const onAdd = () => {
    add(product.slug, qty, note);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const buyNow = () => {
    add(product.slug, qty, note);
    router.push('/cart');
  };

  const waText =
    `Hi Qrkada! I'd like to order:\n• ${product.name} × ${qty} — ${formatINR(product.price * qty)}` +
    (note ? `\nBusiness name: ${note}` : '') +
    `\n\nPlease share the design proof.`;

  return (
    <div className="buybox">
      <label className="field">
        <span>Business name to print <em>(optional)</em></span>
        <input value={biz} onChange={(e) => setBiz(e.target.value)} placeholder="e.g. Malabar Café" maxLength={60} />
      </label>
      <p className="buybox__hint">We’ll collect your logo and links on WhatsApp after you order.</p>

      <div className="buybox__row">
        <div className="qty" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><IconMinus size={16} /></button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity"><IconPlus size={16} /></button>
        </div>
        <button className={`btn btn--dark btn--grow ${added ? 'is-done' : ''}`} onClick={onAdd}>
          <IconBag size={18} /> {added ? 'Added!' : 'Add to cart'}
        </button>
      </div>
      <div className="buybox__row">
        <button className="btn btn--red btn--grow" onClick={buyNow}>Buy now · {formatINR(product.price * qty)}</button>
        <a className="btn btn--wa" href={waLink(waText)} target="_blank" rel="noreferrer" aria-label="Order on WhatsApp">
          <IconWhatsApp size={20} />
        </a>
      </div>
    </div>
  );
}
