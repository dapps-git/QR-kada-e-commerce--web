'use client';

import { useState } from 'react';
import { waLink } from '@/data/site';
import { IconArrow } from '@/components/Icons';

export default function TrackForm() {
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const submit = (e) => {
    e.preventDefault();
    window.open(waLink(`Hi Qrkada, please share the status of my order.\nOrder ID: ${id.trim() || '—'}\nPhone: ${phone.trim()}`), '_blank');
  };
  return (
    <form className="track reveal" onSubmit={submit}>
      <label className="field"><span>Order ID</span><input value={id} onChange={(e) => setId(e.target.value.toUpperCase())} placeholder="QK1A2B3C" /></label>
      <label className="field"><span>Phone number</span><input required value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="10-digit mobile" /></label>
      <button className="btn btn--dark" type="submit">Track <IconArrow size={18} /></button>
    </form>
  );
}
