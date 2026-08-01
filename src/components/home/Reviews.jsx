import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { reviews } from '../../data/store.js';

export default function Reviews() {
  return (
    <section className="mx-4 mt-14 sm:mx-6">
      <div className="section-heading mb-6 text-center">
        <h2>What customers say</h2>
        <p>Real feedback from real Mobile shoppers.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.article
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="card-shell p-5"
          >
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FaStar key={idx} className={idx < review.rating ? '' : 'text-amber-100'} />
              ))}
            </div>
            <p className="mt-3 text-sm text-ink">"{review.text}"</p>
            <p className="mt-3 text-xs font-semibold text-muted">
              {review.name} • <span className="text-primary">{review.product}</span>
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
