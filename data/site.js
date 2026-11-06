// ─────────────────────────────────────────────────────────────
//  Qrkada — store settings. Edit contact details & offers here.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Qrkada',
  domain: 'qrkada.com',
  url: 'https://qrkada.com',
  tagline: 'Smart QR. Bigger Business.',
  description:
    'Premium QR & NFC review stands, payment stands and smart business cards — handcrafted in Kerala for shops, cafés, clinics and studios across India.',
  phone: '7306098080',
  phoneDisplay: '+91 73060 98080',
  whatsapp: '917306098080',
  email: 'hello@qrkada.com',
  location: 'Valanchery, Malappuram, Kerala',
  hours: 'Mon – Sat · 9:30 AM – 7:00 PM',
  social: {
    facebook: 'https://www.facebook.com/share/19yGiUeDfV/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/qr.kada',
  },
  // Partial COD: amount customer pays in advance, rest on delivery
  advanceAmount: 299,
  freeShippingAbove: 999,
  shippingFee: 79,
};

export const announcements = [
  'Free design proof before printing',
  `Pay just ₹299 now · rest on delivery`,
  'Made in Kerala, shipped across India',
  'Free shipping above ₹999',
  'Works with every phone · QR + NFC',
];

export const waLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const formatINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
