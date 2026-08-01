import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { MdCompareArrows } from 'react-icons/md';
import Rating from '../common/Rating.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCompare } from '../../context/CompareContext.jsx';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();
  const [justAdded, setJustAdded] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="card-shell group relative flex flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden bg-surface2">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            -{discount}%
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 bg-gradient-to-t from-black/40 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            aria-pressed={isWishlisted(product.id)}
            className={`icon-btn h-9 w-9 !bg-white/95 ${isWishlisted(product.id) ? 'text-red-500 border-red-300' : ''}`}
          >
            <FiHeart className={isWishlisted(product.id) ? 'fill-current' : ''} />
          </button>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
            className="icon-btn h-9 w-9 !bg-white/95"
          >
            <FiEye />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            aria-label="Add to compare"
            aria-pressed={isComparing(product.id)}
            className={`icon-btn h-9 w-9 !bg-white/95 ${isComparing(product.id) ? 'text-primary border-primary' : ''}`}
          >
            <MdCompareArrows />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted">{product.brand}</span>
        <h3 className="line-clamp-1 font-semibold text-ink">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted">{product.desc}</p>
        <Rating value={product.rating} reviewsCount={product.reviewsCount} />

        <div className="mt-1 flex items-baseline gap-2">
          <strong className="text-lg text-ink">{formatPrice(product.price)}</strong>
          <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
        </div>

        <span className={`text-xs font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </span>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiShoppingCart />
          {justAdded ? 'Added!' : 'Add to cart'}
        </button>
      </div>
    </motion.article>
  );
}
