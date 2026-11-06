import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop QR & NFC Stands',
  description: 'Browse Qrkada review stands, UPI payment stands, NFC business cards and smart tags.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container section" />}>
      <ShopClient />
    </Suspense>
  );
}
