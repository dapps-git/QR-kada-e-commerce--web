import { notFound } from 'next/navigation';
import { site, formatINR } from '@/data/site';

// Edit your store policies here.
const POLICIES = {
  shipping: {
    title: 'Shipping policy',
    body: [
      ['Processing time', 'Every product is made to order. Production starts after you approve the design proof and usually takes 1–2 working days.'],
      ['Delivery time', 'Kerala: 2–4 working days after dispatch. Rest of India: 4–7 working days. A tracking link is shared on WhatsApp once shipped.'],
      ['Shipping charges', `Free shipping on orders above ${formatINR(site.freeShippingAbove)}. A flat ${formatINR(site.shippingFee)} applies to smaller orders.`],
      ['Partial cash on delivery', `Pay ${formatINR(site.advanceAmount)} in advance to confirm your order; pay the balance to the courier on delivery.`],
    ],
  },
  refund: {
    title: 'Refund & return policy',
    body: [
      ['Custom products', 'Because every stand and card is printed with your details, we cannot accept returns for change of mind once the design is approved.'],
      ['Damaged or faulty items', 'If your product arrives damaged, or the NFC/QR does not work, send us an unboxing photo or video on WhatsApp within 48 hours of delivery. We will replace it free of charge.'],
      ['Cancellations', 'You can cancel for a full refund any time before you approve the design proof.'],
      ['Refund timeline', 'Approved refunds are processed to the original payment method within 5–7 working days.'],
    ],
  },
  privacy: {
    title: 'Privacy policy',
    body: [
      ['What we collect', 'Your name, phone number, delivery address and the links/logo you share for your design. We collect these only to make and deliver your order.'],
      ['How we use it', 'To contact you about your order, share design proofs and arrange delivery. We do not sell or share your details with third parties, other than the courier delivering your order.'],
      ['Cart data', 'Your cart is stored only in your own browser (local storage) and is never sent to us until you place an order.'],
      ['Contact', `For any privacy request, message us on ${site.phoneDisplay}.`],
    ],
  },
  terms: {
    title: 'Terms of service',
    body: [
      ['Orders', 'An order is confirmed once the advance payment is received. Prices are in Indian Rupees and include applicable taxes.'],
      ['Design approval', 'You are responsible for checking spellings, links and details in the design proof before approving it.'],
      ['Links & content', 'You confirm you have the right to use the logos, names and links you provide for printing.'],
      ['Governing law', 'These terms are governed by the laws of India, with jurisdiction in Malappuram, Kerala.'],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: POLICIES[slug]?.title || 'Policy' };
}

export default async function Policy({ params }) {
  const { slug } = await params;
  const p = POLICIES[slug];
  if (!p) notFound();
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">Policies</p>
          <h1 className="h1">{p.title}</h1>
        </div>
      </section>
      <section className="container narrow prose">
        {p.body.map(([h, t]) => (
          <div key={h}>
            <h2>{h}</h2>
            <p>{t}</p>
          </div>
        ))}
        <p className="muted small">Last updated: November 2026</p>
      </section>
      <div className="section--sm" />
    </>
  );
}
