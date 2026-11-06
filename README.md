# Qrkada — qrkada.com

Premium storefront for Qrkada smart QR & NFC stands. Built with **Next.js 15 (App Router)**, React 19 and plain CSS. No admin panel and no database: products live in one file, and orders arrive on WhatsApp.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Deploy: push to GitHub → import on **Vercel** → add the domain `qrkada.com`.

## Add or edit products (your "admin panel")

Open **`data/products.js`** and copy any block in `products`:

```js
{
  slug: 'my-new-stand',              // URL: /product/my-new-stand
  name: 'My New Stand',
  category: 'review-stands',         // review-stands | payment-stands | nfc-cards | tags | bundles
  professions: ['cafe', 'salon'],    // shows under "Shop by business"
  price: 999,
  mrp: 1999,
  badge: 'New',                      // optional
  image: '/products/my-new-stand.jpg', // optional: put the photo in /public/products/
  art: { type: 'stand', theme: 'noir', codes: ['Review', 'Pay'] }, // used when no image
  short: 'One-line description.',
  features: ['Point one', 'Point two'],
  specs: { Size: '15 × 20 cm', Material: 'Acrylic' },
}
```

Save the file and the product appears in the shop, search, product page and sitemap.

Without a photo, each product shows an illustrated stand. `theme` can be `noir`, `crimson`, `frost`, `ivory`, `walnut` or `pearl`; `type` can be `stand`, `card` or `tag`. Swap in real photos whenever you have them (square, about 1200×1200 works best).

**Reviews:** add *real* customer reviews to `testimonials` in the same file. The review section only appears on the home page once that list has entries. Add `rating` / `reviews` to a product only when you have real numbers.

## Store settings

`data/site.js` holds the phone/WhatsApp number, location, social links, advance amount (₹299), free-shipping threshold and the announcement bar text.

Policies (shipping, refund, privacy, terms) are in `app/policies/[slug]/page.js`. Review them before going live.

## How ordering works

Cart is saved in the visitor's browser → checkout form → **"Place order on WhatsApp"** opens WhatsApp to 7306098080 with the full order (items, total, partial-COD split, address). You then send a payment link and a design proof. To take online payments later, plug in Razorpay at that step.

## Structure

```
app/            pages (home, shop, product/[slug], cart, about, contact, track-order, policies)
components/     Header, Footer, ProductCard, StandArt (SVG product renders), Icons, CartProvider
data/           products.js, site.js   ← edit these
public/images/  logo, banner, studio photo, hero stand
```
