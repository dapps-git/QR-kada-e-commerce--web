'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './CartProvider';
import StandArt from './StandArt';
import { discount, getCategory } from '@/data/products';
import { formatINR } from '@/data/site';
import { IconPlus, IconStar } from './Icons';

export function ProductMedia({ product, priority, sizes = '(max-width: 768px) 50vw, 25vw' }) {
  return product.image ? (
    <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} className="media-img" />
  ) : (
    <StandArt art={product.art} id={product.slug} className="media-art" />
  );
}

export default function ProductCard({ product, index = 0 }) {
  const { add } = useCart();
  const off = discount(product);
  return (
    <article className="pcard reveal" style={{ '--d': `${(index % 4) * 70}ms` }}>
      <Link href={`/product/${product.slug}`} className={`pcard__media theme-${product.art?.theme || 'noir'}`}>
        <ProductMedia product={product} />
        <span className="pcard__tags">
          {product.badge && <span className="tag tag--dark">{product.badge}</span>}
          <span className="tag tag--red">−{off}%</span>
        </span>
      </Link>
      <div className="pcard__body">
        <p className="pcard__cat">{getCategory(product.category)?.name}</p>
        <h3 className="pcard__title">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        {product.rating ? (
          <p className="pcard__rating">
            <IconStar size={13} /> {product.rating}
            {product.reviews ? <span>({product.reviews})</span> : null}
          </p>
        ) : null}
        <div className="pcard__foot">
          <p className="price">
            <strong>{formatINR(product.price)}</strong>
            <s>{formatINR(product.mrp)}</s>
          </p>
          <button className="pcard__add" onClick={() => add(product.slug)} aria-label={`Add ${product.name} to cart`}>
            <IconPlus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
