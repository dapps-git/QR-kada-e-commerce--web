'use client';

import { useState } from 'react';
import { waLink } from '@/data/site';
import { IconWhatsApp } from '@/components/Icons';

const TOPICS = ['Custom design', 'Bulk / franchise order', 'Order help', 'Something else'];

export default function ContactForm() {
  const [f, setF] = useState({ name: '', business: '', topic: TOPICS[0], message: '' });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const send = (e) => {
    e.preventDefault();
    const text = `Hi Qrkada! I'm ${f.name || '—'}${f.business ? ` from ${f.business}` : ''}.\nTopic: ${f.topic}\n\n${f.message}`;
    window.open(waLink(text), '_blank');
  };

  return (
    <form onSubmit={send} className="form-grid">
      <label className="field"><span>Your name</span><input required value={f.name} onChange={set('name')} /></label>
      <label className="field"><span>Business</span><input value={f.business} onChange={set('business')} /></label>
      <div className="field field--wide">
        <span>Topic</span>
        <div className="chips">
          {TOPICS.map((t) => (
            <button type="button" key={t} className={`chip ${f.topic === t ? 'is-active' : ''}`} onClick={() => setF((s) => ({ ...s, topic: t }))}>{t}</button>
          ))}
        </div>
      </div>
      <label className="field field--wide"><span>Message</span><textarea required rows={4} value={f.message} onChange={set('message')} placeholder="Tell us what you need…" /></label>
      <button className="btn btn--red btn--block field--wide" type="submit"><IconWhatsApp size={18} /> Send on WhatsApp</button>
    </form>
  );
}
