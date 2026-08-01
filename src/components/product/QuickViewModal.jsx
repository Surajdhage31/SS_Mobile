import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';
import Rating from '../common/Rating.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view of ${product.name}`}
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-soft sm:p-6"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="icon-btn absolute right-4 top-4"
            >
              <FiX />
            </button>

            <div className="grid gap-6 sm:grid-cols-2">
              <img src={product.image} alt={product.name} className="aspect-square w-full rounded-xl object-cover" />
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">{product.brand}</span>
                <h3 className="text-xl font-bold text-ink">{product.name}</h3>
                <Rating value={product.rating} reviewsCount={product.reviewsCount} />
                <p className="text-sm text-muted">{product.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span key={spec} className="rounded-full bg-surface2 px-3 py-1 text-xs font-medium text-primary">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline gap-2">
                  <strong className="text-2xl text-ink">{formatPrice(product.price)}</strong>
                  <span className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</span>
                </div>

                <span className={`text-sm font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </span>

                <div className="mt-auto flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => addToCart(product.id, 1)}
                    disabled={!product.inStock}
                    className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiShoppingCart /> Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`icon-btn ${isWishlisted(product.id) ? 'text-red-500 border-red-300' : ''}`}
                    aria-label="Toggle wishlist"
                  >
                    <FiHeart />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
