import { useState } from 'react';
import { FiMapPin, FiPhone, FiClock, FiMail } from 'react-icons/fi';
import { storeInfo } from '../data/store.js';
import PageTransition from '../components/common/PageTransition.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <PageTransition>
      <section className="mx-4 mt-6 sm:mx-6">
        <div className="section-heading mb-8">
          <h2>Get in touch</h2>
          <p>Questions about an order, product, or store visit? We're here to help.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-shell space-y-5 p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                <FiMapPin />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Visit us</p>
                <p className="text-sm text-muted">{storeInfo.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                <FiPhone />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Call us</p>
                <p className="text-sm text-muted">{storeInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                <FiClock />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Open hours</p>
                <p className="text-sm text-muted">{storeInfo.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                <FiMail />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <p className="text-sm text-muted">support@ssmobile.example</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-shell space-y-3 p-6">
            <input
              required
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <textarea
              required
              rows={4}
              placeholder="How can we help?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button type="submit" className="btn-primary w-full">
              Send message
            </button>
            {sent && (
              <p className="rounded-lg bg-emerald-50 px-4 py-2.5 text-center text-sm font-medium text-emerald-700">
                Thanks! We'll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
