import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function OfferBanner() {
  return (
    <motion.section
      id="deals"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mx-4 mt-14 flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-8 text-white sm:mx-6 sm:flex-row sm:items-center sm:justify-between sm:p-10"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Limited-time launch</p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Festival offers are live now</h2>
        <p className="mt-2 max-w-md text-sm text-white/85">
          Get up to 30% off select accessories and free delivery on orders above ₹999.
        </p>
      </div>
      <Link to="/shop" className="btn bg-white text-primary shadow-card hover:-translate-y-0.5">
        Claim offer
      </Link>
    </motion.section>
  );
}
