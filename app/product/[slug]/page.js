import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProduct, getCategory, discount } from '@/data/products';
import { site, formatINR } from '@/data/site';
import ProductCard, { ProductMedia } from '@/components/ProductCard';
import BuyBox from './BuyBox';
import { IconCheck, IconChevron, IconTruck, IconBrush, IconShield, IconStar } from '@/components/Icons';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.short,
    openGraph: { title: `${p.name} · Qrkada`, description: p.short, images: [p.image || '/images/banner.jpg'] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category);
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category)
    .concat(products.filter((x) => x.slug !== p.slug && x.category !== p.category))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.short,
    image: `${site.url}${p.image || '/images/banner.jpg'}`,
    brand: { '@type': 'Brand', name: 'Qrkada' },
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: 'https://schema.org/InStock', url: `${site.url}/product/${p.slug}` },
  };

  return (
    <>
      <div className="container crumbs">
        <Link href="/">Home</Link><IconChevron size={14} />
        <Link href={`/shop?c=${p.category}`}>{cat?.name}</Link><IconChevron size={14} />
        <span>{p.name}</span>
      </div>

      <section className="container pdp">
        <div className={`pdp__media theme-${p.art?.theme || 'noir'} reveal`}>
          <ProductMedia product={p} priority sizes="(max-width: 900px) 100vw, 50vw" />
          {discount(p) > 0 && <span className="tag tag--red pdp__off">Save {discount(p)}%</span>}
        </div>

        <div className="pdp__info">
          <p className="eyebrow">{cat?.name}</p>
          <h1 className="pdp__title">{p.name}</h1>
          {p.rating ? (
            <p className="pdp__rating"><IconStar size={15} /> {p.rating}{p.reviews ? <span> · {p.reviews} reviews</span> : null}</p>
          ) : null}
          <p className="pdp__price">
            <strong>{formatINR(p.price)}</strong>
            {p.mrp > p.price && (
              <>
                <s>{formatINR(p.mrp)}</s>
                <span className="pdp__save">You save {formatINR(p.mrp - p.price)}</span>
              </>
            )}
          </p>
          <p className="pdp__tax">Inclusive of all taxes · Pay {formatINR(site.advanceAmount)} now, rest on delivery</p>
          <p className="pdp__short">{p.short}</p>

          <BuyBox product={p} />

          <ul className="pdp__perks">
            <li><IconBrush size={18} /><span><strong>Free design proof</strong> on WhatsApp before printing</span></li>
            <li><IconTruck size={18} /><span><strong>Ships in 3–5 days</strong> after approval · free above {formatINR(site.freeShippingAbove)}</span></li>
            <li><IconShield size={18} /><span><strong>Tested on iPhone &amp; Android</strong> before dispatch</span></li>
          </ul>

          <div className="pdp__block">
            <h2 className="pdp__h">What you get</h2>
            <ul className="checks">
              {p.features.map((f) => <li key={f}><IconCheck size={16} /> {f}</li>)}
            </ul>
          </div>

          <div className="pdp__block">
            <h2 className="pdp__h">Specifications</h2>
            <dl className="specs">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="h2">You may also like</h2>
            <Link href="/shop" className="link-arrow">Shop all</Link>
          </div>
          <div className="grid-products">
            {related.map((x, i) => <ProductCard key={x.slug} product={x} index={i} />)}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
