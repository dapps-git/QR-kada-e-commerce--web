'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { ProductMedia } from '@/components/ProductCard';
import { site, waLink, formatINR } from '@/data/site';
import { IconMinus, IconPlus, IconTrash, IconArrow, IconWhatsApp, IconShield, IconCheck, IconBag } from '@/components/Icons';

const empty = { name: '', phone: '', address: '', city: '', pincode: '', notes: '' };

export default function CartClient() {
  const { lines, count, subtotal, mrpTotal, shipping, total, setQty, remove, clear, ready } = useCart();
  const [form, setForm] = useState(empty);
  const [pay, setPay] = useState('partial');
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const advance = pay === 'partial' ? Math.min(site.advanceAmount, total) : total;
  const balance = total - advance;

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) e.phone = 'Enter a valid 10-digit mobile number';
    if (form.address.trim().length < 8) e.address = 'Please enter your full address';
    if (form.city.trim().length < 2) e.city = 'Enter city';
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = '6-digit PIN';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const placeOrder = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const id = 'QK' + Date.now().toString(36).toUpperCase().slice(-6);
    const items = lines
      .map((l, i) => `${i + 1}. ${l.product.name} × ${l.qty} — ${formatINR(l.qty * l.product.price)}${l.note ? `\n   Print name: ${l.note}` : ''}`)
      .join('\n');
    const msg =
`🧾 New order ${id}

${items}

Subtotal: ${formatINR(subtotal)}
Shipping: ${shipping ? formatINR(shipping) : 'Free'}
Total: ${formatINR(total)}
Payment: ${pay === 'partial' ? `Partial COD — ${formatINR(advance)} now, ${formatINR(balance)} on delivery` : `Full prepaid — ${formatINR(total)}`}

👤 ${form.name}
📞 ${form.phone}
📍 ${form.address}, ${form.city} — ${form.pincode}${form.notes ? `\n📝 ${form.notes}` : ''}

Please send the payment link & design proof.`;
    window.open(waLink(msg), '_blank');
    setDone({ id, name: form.name.split(' ')[0] });
    clear();
    setForm(empty);
  };

  if (done) {
    return (
      <section className="container section center-col">
        <div className="success reveal">
          <span className="success__icon"><IconCheck size={30} /></span>
          <h1 className="h2">Thank you, {done.name}!</h1>
          <p className="muted">Order <strong>{done.id}</strong> was sent to us on WhatsApp. We’ll reply with your payment link and design proof shortly.</p>
          <p className="muted small">WhatsApp didn’t open? <a href={waLink(`Hi, I placed order ${done.id} on qrkada.com`)} target="_blank" rel="noreferrer" className="u">Tap here</a>.</p>
          <Link href="/shop" className="btn btn--dark">Continue shopping <IconArrow size={18} /></Link>
        </div>
      </section>
    );
  }

  if (!ready) return <section className="container section" style={{ minHeight: '60vh' }} />;

  if (!lines.length) {
    return (
      <section className="container section center-col">
        <div className="empty empty--cart">
          <span className="empty__icon"><IconBag size={34} /></span>
          <h1 className="h2">Your cart is empty</h1>
          <p className="muted">Find a stand that suits your counter — every order gets a free design proof.</p>
          <Link href="/shop" className="btn btn--red">Start shopping <IconArrow size={18} /></Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero page-hero--sm">
        <div className="container">
          <h1 className="h1">Cart <span className="muted-num">({count})</span></h1>
        </div>
      </section>

      <section className="container checkout">
        <div className="checkout__main">
          <ul className="lines">
            {lines.map((l) => (
              <li key={l.key} className="line">
                <Link href={`/product/${l.slug}`} className={`line__media theme-${l.product.art?.theme}`}>
                  <ProductMedia product={l.product} sizes="120px" />
                </Link>
                <div className="line__info">
                  <Link href={`/product/${l.slug}`} className="line__name">{l.product.name}</Link>
                  {l.note && <p className="line__note">Print: {l.note}</p>}
                  <p className="price price--sm"><strong>{formatINR(l.product.price)}</strong><s>{formatINR(l.product.mrp)}</s></p>
                  <div className="line__ctrl">
                    <div className="qty qty--sm">
                      <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease"><IconMinus size={14} /></button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase"><IconPlus size={14} /></button>
                    </div>
                    <button className="line__remove" onClick={() => remove(l.key)}><IconTrash size={16} /> Remove</button>
                  </div>
                </div>
                <p className="line__total">{formatINR(l.qty * l.product.price)}</p>
              </li>
            ))}
          </ul>

          <form className="ship-form" onSubmit={placeOrder} noValidate>
            <h2 className="h3">Delivery details</h2>
            <div className="form-grid">
              <Field label="Full name" error={errors.name}><input value={form.name} onChange={set('name')} autoComplete="name" /></Field>
              <Field label="Mobile (WhatsApp)" error={errors.phone}><input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" placeholder="10-digit number" /></Field>
              <Field label="Address" error={errors.address} wide><textarea rows={2} value={form.address} onChange={set('address')} autoComplete="street-address" placeholder="Shop / house, street, landmark" /></Field>
              <Field label="City" error={errors.city}><input value={form.city} onChange={set('city')} autoComplete="address-level2" /></Field>
              <Field label="PIN code" error={errors.pincode}><input value={form.pincode} onChange={set('pincode')} inputMode="numeric" maxLength={6} autoComplete="postal-code" /></Field>
              <Field label="Notes for design (optional)" wide><input value={form.notes} onChange={set('notes')} placeholder="Colours, links, anything we should know" /></Field>
            </div>

            <h2 className="h3">Payment</h2>
            <div className="pay-opts">
              <label className={`pay-opt ${pay === 'partial' ? 'is-on' : ''}`}>
                <input type="radio" name="pay" checked={pay === 'partial'} onChange={() => setPay('partial')} />
                <span>
                  <strong>Partial COD</strong>
                  <em>Pay {formatINR(Math.min(site.advanceAmount, total))} now, rest on delivery</em>
                </span>
              </label>
              <label className={`pay-opt ${pay === 'full' ? 'is-on' : ''}`}>
                <input type="radio" name="pay" checked={pay === 'full'} onChange={() => setPay('full')} />
                <span>
                  <strong>Pay in full (UPI)</strong>
                  <em>Priority design · same-day proof</em>
                </span>
              </label>
            </div>

            <button className="btn btn--red btn--lg btn--block" type="submit">
              <IconWhatsApp size={20} /> Place order on WhatsApp
            </button>
            <p className="muted small center"><IconShield size={14} /> We confirm every order personally. Payment link is shared on WhatsApp.</p>
          </form>
        </div>

        <aside className="summary">
          <h2 className="h3">Order summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="good"><dt>You save</dt><dd>−{formatINR(mrpTotal - subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping ? formatINR(shipping) : 'Free'}</dd></div>
            <div className="summary__total"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
          {subtotal < site.freeShippingAbove && (
            <div className="ship-meter">
              <p>Add <strong>{formatINR(site.freeShippingAbove - subtotal)}</strong> more for free shipping</p>
              <span><i style={{ width: `${Math.min(100, (subtotal / site.freeShippingAbove) * 100)}%` }} /></span>
            </div>
          )}
          <div className="summary__split">
            <div><span>Pay now</span><strong>{formatINR(advance)}</strong></div>
            <div><span>On delivery</span><strong>{formatINR(balance)}</strong></div>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ label, error, wide, children }) {
  return (
    <label className={`field ${wide ? 'field--wide' : ''} ${error ? 'has-error' : ''}`}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}
