import { products } from '@/data/products';
import { site } from '@/data/site';

export default function sitemap() {
  const pages = ['', '/shop', '/about', '/contact', '/track-order', '/policies/shipping', '/policies/refund', '/policies/privacy', '/policies/terms'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/product/${p.slug}`, changeFrequency: 'weekly', priority: 0.8 })),
  ];
}
