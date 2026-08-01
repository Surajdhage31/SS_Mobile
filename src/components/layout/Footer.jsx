import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import { storeInfo } from '../../data/store.js';

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-extrabold text-white">
              S
            </span>
            <strong className="text-ink">{storeInfo.name}</strong>
          </div>
          <p className="mt-3 text-sm text-muted">
            Premium smartphones, tablets, smart TVs, and accessories — with genuine products, easy EMI, and
            trade-in offers.
          </p>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <FiMapPin className="text-primary" /> Visit us
          </h3>
          <p className="text-sm text-muted">{storeInfo.address}</p>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <FiPhone className="text-primary" /> Call us
          </h3>
          <p className="text-sm text-muted">{storeInfo.phone}</p>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <FiClock className="text-primary" /> Open hours
          </h3>
          <p className="text-sm text-muted">{storeInfo.hours}</p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>© {new Date().getFullYear()} {storeInfo.name}. All rights reserved.</span>
          <span className="flex gap-4">
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <Link to="/compare" className="hover:text-primary">Compare</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
