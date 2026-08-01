import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiHeadphones, FiTablet, FiTv, FiWatch } from 'react-icons/fi';

const categoryMeta = [
  { name: 'Smartphones', icon: FiSmartphone, text: 'Flagship and mid-range phones with EMI options.' },
  { name: 'Accessories', icon: FiHeadphones, text: 'Cases, chargers, earbuds, cables, and power banks.' },
  { name: 'Tablets', icon: FiTablet, text: 'Study, work, and entertainment in one sleek device.' },
  { name: 'Smart TVs', icon: FiTv, text: 'Immersive viewing at home with crisp visuals.' },
  { name: 'Wearables', icon: FiWatch, text: 'Smartwatches and fitness trackers for every day.' }
];

export default function CategoryGrid() {
  return (
    <section className="mx-4 mt-14 sm:mx-6">
      <div className="section-heading mb-6 text-center">
        <h2>Browse by category</h2>
        <p>Everything you need for a smarter digital life.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categoryMeta.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="card-shell group flex h-full flex-col items-center gap-2 p-5 text-center transition-transform hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-light text-xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <cat.icon />
              </span>
              <h3 className="text-sm font-semibold text-ink">{cat.name}</h3>
              <p className="text-xs text-muted">{cat.text}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
