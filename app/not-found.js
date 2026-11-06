import Link from 'next/link';
import { IconArrow } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="container section center-col">
      <div className="empty">
        <p className="nf-code">404</p>
        <h1 className="h2">This page didn’t scan.</h1>
        <p className="muted">The link may be old or mistyped.</p>
        <Link href="/" className="btn btn--dark">Back to home <IconArrow size={18} /></Link>
      </div>
    </section>
  );
}
