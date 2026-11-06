import TrackForm from './TrackForm';
import { IconBag, IconBrush, IconSparkle, IconTruck, IconCheck } from '@/components/Icons';

export const metadata = { title: 'Track your order' };

const STAGES = [
  [IconBag, 'Order placed', 'Confirmed on WhatsApp'],
  [IconBrush, 'Design approved', 'You OK the proof'],
  [IconSparkle, 'Crafting', 'Printed, chip fitted, tested'],
  [IconTruck, 'Shipped', 'Tracking link shared'],
  [IconCheck, 'Delivered', 'Tap, scan, grow'],
];

export default function TrackOrder() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <p className="eyebrow">Track order</p>
          <h1 className="h1 reveal">Where’s my stand?</h1>
          <p className="muted page-hero__sub">Enter your order ID (starts with QK) and phone number. We’ll send the live status on WhatsApp.</p>
        </div>
      </section>
      <section className="container narrow">
        <TrackForm />
        <ol className="stages">
          {STAGES.map(([Icon, t, s], i) => (
            <li key={t} className="reveal" style={{ '--d': `${i * 80}ms` }}>
              <span className="stages__icon"><Icon size={20} /></span>
              <strong>{t}</strong>
              <em>{s}</em>
            </li>
          ))}
        </ol>
      </section>
      <div className="section--sm" />
    </>
  );
}
