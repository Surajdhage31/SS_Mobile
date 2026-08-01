import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../services/productService.js';
import ProductCard from '../product/ProductCard.jsx';
import { ProductGridSkeleton } from '../common/Skeleton.jsx';

// Reusable homepage rail: pass a `filter` fn to select which products
// show (trending, best sellers, new launches, accessories, featured...).
export default function ProductSection({ id, title, subtitle, filter, viewAllHref = '/shop', limit = 4, onQuickView }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    fetchProducts().then((all) => {
      if (!active) return;
      setItems(all.filter(filter).slice(0, limit));
      setLoading(false);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id={id} className="mx-4 mt-14 sm:mx-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="section-heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <Link to={viewAllHref} className="hidden shrink-0 text-sm font-semibold text-primary hover:underline sm:block">
          View all →
        </Link>
      </div>

      {loading ? (
        <ProductGridSkeleton count={limit} />
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
