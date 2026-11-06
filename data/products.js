// ─────────────────────────────────────────────────────────────
//  PRODUCTS — this is your "admin panel" for now.
//  To add a product: copy one block below, change the values, save.
//
//  image: put a photo in /public/products/ and set image: '/products/file.jpg'
//         (leave image out to use the built-in illustrated stand)
//  art.theme: 'noir' | 'frost' | 'ivory' | 'crimson' | 'walnut' | 'pearl'
//  art.type : 'stand' | 'card' | 'tag'
//  art.codes: labels for each QR on the stand (1 – 4)
//  rating / reviews: optional — add only real numbers, e.g. rating: 4.8, reviews: 12
// ─────────────────────────────────────────────────────────────

export const categories = [
  { id: 'review-stands', name: 'Review Stands', blurb: 'Turn every visit into a Google review' },
  { id: 'payment-stands', name: 'Payment Stands', blurb: 'UPI, review & WhatsApp on one counter' },
  { id: 'nfc-cards', name: 'NFC Cards', blurb: 'Tap-to-share business cards' },
  { id: 'tags', name: 'Tags & Stickers', blurb: 'Small, stick-anywhere smart tags' },
  { id: 'bundles', name: 'Bundles', blurb: 'Kits that save more' },
];

export const professions = [
  { id: 'cafe', name: 'Cafés & Restaurants' },
  { id: 'salon', name: 'Salons & Spas' },
  { id: 'clinic', name: 'Clinics & Doctors' },
  { id: 'retail', name: 'Retail & Showrooms' },
  { id: 'gym', name: 'Gyms & Studios' },
  { id: 'hotel', name: 'Hotels & Homestays' },
];

export const products = [
  {
    slug: 'signature-noir-review-stand',
    name: 'Signature Noir Review Stand',
    category: 'review-stands',
    professions: ['cafe', 'salon', 'clinic', 'retail', 'hotel'],
    price: 899,
    mrp: 1999,
    badge: 'Bestseller',
    image: '/images/stand-hero.jpg',
    art: { type: 'stand', theme: 'noir', codes: ['Review us'] },
    short: 'Our flagship. Gloss-black acrylic, gold-framed QR and an NFC chip for one-tap Google reviews.',
    features: [
      'One tap or one scan opens your Google review page',
      '5 mm high-gloss acrylic with mirror-gold QR frame',
      'NTAG-215 NFC chip — works with iPhone & Android',
      'Your logo & brand colours printed free',
    ],
    specs: { Size: '15 × 20 cm', Material: '5 mm cast acrylic', Chip: 'NTAG 215', Finish: 'Gloss + mirror gold' },
  },
  {
    slug: 'duo-connect-stand',
    name: 'Duo Connect Stand — Google + Instagram',
    category: 'review-stands',
    professions: ['cafe', 'salon', 'gym', 'retail'],
    price: 1149,
    mrp: 2499,
    badge: 'New',
    art: { type: 'stand', theme: 'crimson', codes: ['Review', 'Follow'] },
    short: 'Two codes, one counter. Collect reviews and Instagram followers side by side.',
    features: [
      'Separate QR for Google reviews and Instagram',
      'NFC chip linked to your choice of the two',
      'Bold red & black finish that stands out',
      'Free design proof on WhatsApp before printing',
    ],
    specs: { Size: '20 × 15 cm', Material: '5 mm cast acrylic', Chip: 'NTAG 215', Codes: '2 QR + 1 NFC' },
  },
  {
    slug: 'frost-glass-duo-stand',
    name: 'Frost Glass Duo Stand',
    category: 'review-stands',
    professions: ['salon', 'clinic', 'hotel'],
    price: 1249,
    mrp: 2699,
    art: { type: 'stand', theme: 'frost', codes: ['Google', 'Instagram'] },
    short: 'Soft frosted acrylic with gold accents — made for calm, upscale counters.',
    features: [
      'Satin-frosted acrylic that hides fingerprints',
      'Mirror-gold QR frames and lettering',
      'NFC chip for one-tap reviews',
      'Gold-mirror base included',
    ],
    specs: { Size: '18 × 18 cm', Material: 'Frosted acrylic', Chip: 'NTAG 215', Codes: '2 QR + 1 NFC' },
  },
  {
    slug: 'ivory-pay-and-review-stand',
    name: 'Ivory Pay & Review Stand',
    category: 'payment-stands',
    professions: ['cafe', 'retail', 'clinic'],
    price: 1449,
    mrp: 2999,
    badge: 'Bestseller',
    art: { type: 'stand', theme: 'ivory', codes: ['Review', 'WhatsApp', 'Pay UPI'] },
    short: 'UPI payment, Google review and WhatsApp chat — everything a customer needs at billing.',
    features: [
      'Large UPI QR for faster payments',
      'Review & WhatsApp codes on the same stand',
      'Warm ivory finish with gold frames',
      'NFC chip for reviews',
    ],
    specs: { Size: '24 × 15 cm', Material: '5 mm cast acrylic', Chip: 'NTAG 215', Codes: '3 QR + 1 NFC' },
  },
  {
    slug: 'counter-hub-4-qr-stand',
    name: 'Counter Hub · 4 QR Stand',
    category: 'payment-stands',
    professions: ['retail', 'hotel', 'cafe'],
    price: 1749,
    mrp: 3499,
    art: { type: 'stand', theme: 'frost', codes: ['Review', 'Follow', 'Chat', 'Pay'] },
    short: 'The complete counter: pay, review, follow and chat — on one premium frosted stand.',
    features: [
      'Four QR codes, each labelled with an icon',
      'NFC chip linked to your top priority',
      'Wide base, stable on busy counters',
      'Custom logo and shop name',
    ],
    specs: { Size: '30 × 15 cm', Material: 'Frosted acrylic', Chip: 'NTAG 215', Codes: '4 QR + 1 NFC' },
  },
  {
    slug: 'walnut-table-menu-stand',
    name: 'Walnut Table Menu Stand',
    category: 'review-stands',
    professions: ['cafe', 'hotel'],
    price: 649,
    mrp: 1299,
    art: { type: 'stand', theme: 'walnut', codes: ['Menu'] },
    short: 'Real-wood look table stand for digital menus — set one on every table.',
    features: [
      'Opens your digital menu or Swiggy/Zomato page',
      'Walnut-finish base with matte black face',
      'NFC + QR — guests choose',
      'Bulk price on 10+ pieces',
    ],
    specs: { Size: '10 × 15 cm', Material: 'MDF + acrylic', Chip: 'NTAG 213', Codes: '1 QR + 1 NFC' },
  },
  {
    slug: 'google-review-nfc-card',
    name: 'Google Review NFC Card',
    category: 'nfc-cards',
    professions: ['salon', 'clinic', 'retail', 'gym', 'cafe'],
    price: 399,
    mrp: 899,
    art: { type: 'card', theme: 'noir', codes: ['Review us'] },
    short: 'Hand it over at billing — customers tap, review and hand it back.',
    features: [
      'Credit-card size, matte PVC finish',
      'Tap with phone or scan the QR',
      'Re-programmable if your link changes',
      'Lifetime link — no subscription',
    ],
    specs: { Size: '85.6 × 54 mm', Material: 'Matte PVC', Chip: 'NTAG 215', Codes: '1 QR + 1 NFC' },
  },
  {
    slug: 'metal-smart-business-card',
    name: 'Metal Smart Business Card',
    category: 'nfc-cards',
    professions: ['retail', 'clinic', 'hotel'],
    price: 1499,
    mrp: 2999,
    badge: 'Premium',
    art: { type: 'card', theme: 'pearl', codes: ['Profile'] },
    short: 'Brushed-steel card that shares your full digital profile with a single tap.',
    features: [
      'Laser-engraved name and logo',
      'Opens your digital profile with contact save',
      'Brushed stainless steel, 0.8 mm',
      'Free digital profile setup',
    ],
    specs: { Size: '85.6 × 54 mm', Material: 'Stainless steel', Chip: 'NTAG 216', Codes: '1 QR + 1 NFC' },
  },
  {
    slug: 'crimson-pvc-business-card',
    name: 'Crimson PVC Business Card',
    category: 'nfc-cards',
    professions: ['gym', 'salon', 'retail'],
    price: 549,
    mrp: 1199,
    art: { type: 'card', theme: 'crimson', codes: ['Connect'] },
    short: 'Smart business card in bold red — one card, unlimited contacts shared.',
    features: [
      'Shares phone, WhatsApp, socials & location',
      'Spot-UV printed name',
      'Update details anytime, no reprint',
      'Works without any app',
    ],
    specs: { Size: '85.6 × 54 mm', Material: 'PVC, spot-UV', Chip: 'NTAG 215', Codes: '1 QR + 1 NFC' },
  },
  {
    slug: 'instagram-follow-tag',
    name: 'Instagram Follow Tag',
    category: 'tags',
    professions: ['cafe', 'salon', 'gym', 'retail'],
    price: 249,
    mrp: 599,
    art: { type: 'tag', theme: 'crimson', codes: ['Follow'] },
    short: 'A 5 cm round sticker for mirrors, tables and billing counters.',
    features: [
      'Strong 3M adhesive back',
      'Water-resistant epoxy dome',
      'Opens your Instagram profile instantly',
      'Sold in packs of 2',
    ],
    specs: { Size: '5 cm round', Material: 'Epoxy dome', Chip: 'NTAG 213', Pack: '2 tags' },
  },
  {
    slug: 'wifi-tap-tag',
    name: 'Wi-Fi Tap Tag',
    category: 'tags',
    professions: ['cafe', 'hotel'],
    price: 199,
    mrp: 499,
    art: { type: 'tag', theme: 'noir', codes: ['Wi-Fi'] },
    short: 'Guests tap to join your Wi-Fi — no more spelling out passwords.',
    features: ['Joins Wi-Fi with a scan', 'Peel-and-stick', 'Matte black finish', 'Pack of 2'],
    specs: { Size: '5 cm round', Material: 'Epoxy dome', Chip: 'NTAG 213', Pack: '2 tags' },
  },
  {
    slug: 'shop-starter-kit',
    name: 'Shop Starter Kit',
    category: 'bundles',
    professions: ['cafe', 'salon', 'clinic', 'retail', 'gym', 'hotel'],
    price: 1799,
    mrp: 4299,
    badge: 'Save 58%',
    art: { type: 'stand', theme: 'noir', codes: ['Review', 'Pay'] },
    short: '1 Duo stand + 2 Review NFC cards + 2 Instagram tags. Everything for a new shop.',
    features: [
      '2-QR premium stand (review + payment)',
      '2 Google Review NFC cards',
      '2 Instagram follow tags',
      'Single design, matching branding across all',
    ],
    specs: { Includes: '5 items', Stand: '20 × 15 cm', Chip: 'NTAG 215', Delivery: '4–7 days' },
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getCategory = (id) => categories.find((c) => c.id === id);
export const discount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

// Add REAL customer reviews here (with their permission). The review
// section on the home page appears automatically once this has entries.
// Example: { name: 'Customer name', place: 'Business, Town', text: 'What they said', rating: 5 },
export const testimonials = [];
