'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from '@/data/products';
import { site } from '@/data/site';

const CartContext = createContext(null);
const KEY = 'qrkada-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved)) setItems(saved.filter((i) => getProduct(i.slug)));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = useCallback((slug, qty = 1, note = '') => {
    setItems((prev) => {
      const key = slug + '|' + note;
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, slug, qty, note }];
    });
    const p = getProduct(slug);
    setToast({ id: Date.now(), name: p?.name });
    setBump((b) => b + 1);
  }, []);

  const setQty = useCallback((key, qty) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);
  const remove = useCallback((key) => setItems((prev) => prev.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: getProduct(i.slug) }))
      .filter((i) => i.product);
    const count = lines.reduce((s, i) => s + i.qty, 0);
    const subtotal = lines.reduce((s, i) => s + i.qty * i.product.price, 0);
    const mrpTotal = lines.reduce((s, i) => s + i.qty * i.product.mrp, 0);
    const shipping = subtotal === 0 || subtotal >= site.freeShippingAbove ? 0 : site.shippingFee;
    return {
      lines, count, subtotal, mrpTotal, shipping, total: subtotal + shipping,
      add, setQty, remove, clear, ready, toast, bump,
    };
  }, [items, add, setQty, remove, clear, ready, toast, bump]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
