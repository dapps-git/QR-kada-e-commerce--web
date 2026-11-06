import CartClient from './CartClient';

export const metadata = { title: 'Your cart', robots: { index: false } };

export default function CartPage() {
  return <CartClient />;
}
