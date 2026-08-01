import { motion } from 'framer-motion';
import { FiHeart, FiCreditCard, FiShield, FiMapPin } from 'react-icons/fi';
import { whyChooseUs } from '../../data/store.js';

const iconMap = { heart: FiHeart, card: FiCreditCard, shield: FiShield, store: FiMapPin };

export default function WhyChooseUs() {
  return (
    <section className="mx-4 mt-14 sm:mx-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="card-shell p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-lg text-primary">
                <Icon />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-xs text-muted">{item.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
