'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories, professions } from '@/data/products';
import { IconClose, IconSearch } from '@/components/Icons';

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  discount: { label: 'Biggest savings', fn: (a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp },
};

export default function ShopClient() {
  const params = useSearchParams();
  const router = useRouter();
  const c = params.get('c') || 'all';
  const p = params.get('p') || '';
  const [q, setQ] = useState(params.get('q') || '');
  const [sort, setSort] = useState('featured');

  useEffect(() => { setQ(params.get('q') || ''); }, [params]);

  const setParam = (key, val) => {
    const next = new URLSearchParams(params.toString());
    if (!val || val === 'all') next.delete(key); else next.set(key, val);
    router.replace(`/shop${next.toString() ? '?' + next : ''}`, { scroll: false });
  };

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products
      .filter((x) => c === 'all' || x.category === c)
      .filter((x) => !p || x.professions?.includes(p))
      .filter((x) => !s || (x.name + ' ' + x.short).toLowerCase().includes(s))
      .sort(SORTS[sort].fn);
  }, [c, p, q, sort]);

  const cat = categories.find((x) => x.id === c);
  const prof = professions.find((x) => x.id === p);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Shop</p>
          <h1 className="h1">{cat ? cat.name : prof ? `For ${prof.name}` : 'All products'}</h1>
          <p className="muted page-hero__sub">{cat ? cat.blurb : 'Premium QR & NFC products — every one ships with a free design proof.'}</p>
        </div>
      </section>

      <section className="container shop">
        <div className="shop__bar">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={c === 'all'} className={`tab ${c === 'all' ? 'is-active' : ''}`} onClick={() => setParam('c', 'all')}>All</button>
            {categories.map((x) => (
              <button key={x.id} role="tab" aria-selected={c === x.id} className={`tab ${c === x.id ? 'is-active' : ''}`} onClick={() => setParam('c', x.id)}>
                {x.name}
              </button>
            ))}
          </div>
          <div className="shop__tools">
            <label className="field-inline">
              <IconSearch size={17} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search products" />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select" aria-label="Sort">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        <div className="shop__profs">
          <span className="muted">Business:</span>
          {professions.map((x) => (
            <button key={x.id} className={`chip ${p === x.id ? 'is-active' : ''}`} onClick={() => setParam('p', p === x.id ? '' : x.id)}>
              {x.name}
              {p === x.id && <IconClose size={13} />}
            </button>
          ))}
        </div>

        <p className="shop__count">{list.length} product{list.length === 1 ? '' : 's'}</p>

        {list.length ? (
          <div className="grid-products">
            {list.map((x, i) => <ProductCard key={x.slug} product={x} index={i} />)}
          </div>
        ) : (
          <div className="empty">
            <h3>Nothing matches that</h3>
            <p className="muted">Try clearing a filter, or tell us what you need — we make custom designs too.</p>
            <button className="btn btn--dark" onClick={() => { setQ(''); router.replace('/shop'); }}>Clear filters</button>
          </div>
        )}
      </section>
    </>
  );
}
