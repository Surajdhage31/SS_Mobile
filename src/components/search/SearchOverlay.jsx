import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products.js';
import { getSearchSuggestions } from '../../services/productService.js';
import { useDebounce } from '../../hooks/useDebounce.js';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function SearchOverlay({ open, onClose }) {
  const [term, setTerm] = useState('');
  const debounced = useDebounce(term, 200);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTerm('');
    }
  }, [open]);

  const suggestions = getSearchSuggestions(products, debounced);

  const goToShop = (searchTerm) => {
    navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-50 mx-auto max-w-2xl p-4 sm:top-10"
          >
            <div className="card-shell overflow-hidden">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (term.trim()) goToShop(term.trim());
                }}
                className="flex items-center gap-3 border-b border-border px-4 py-3"
              >
                <FiSearch className="text-lg text-muted" />
                <input
                  ref={inputRef}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="search"
                  placeholder="Search phones, accessories, brands..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                />
                <button type="button" onClick={onClose} aria-label="Close search" className="icon-btn h-9 w-9">
                  <FiX />
                </button>
              </form>

              {suggestions.length > 0 && (
                <ul className="max-h-80 divide-y divide-border overflow-y-auto">
                  {suggestions.map((product) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => goToShop(product.name)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface2"
                      >
                        <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-ink">{product.name}</span>
                          <span className="block text-xs text-muted">{product.category} • {product.brand}</span>
                        </span>
                        <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {debounced && suggestions.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-muted">No matches for "{debounced}".</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
