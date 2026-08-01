import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { brands, allSpecs } from '../../data/products.js';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function FilterDrawer({ open, onClose, state, setState }) {
  const toggleSpec = (spec) => {
    setState((prev) => ({
      ...prev,
      selectedSpecs: prev.selectedSpecs.includes(spec)
        ? prev.selectedSpecs.filter((s) => s !== spec)
        : [...prev.selectedSpecs, spec]
    }));
  };

// Example in Navigation or Filter drawer calls:
const handleNavigation = (path) => {
  onClose(); // Ensure open modals/drawers close before switching view
  navigate(path);
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
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            aria-label="Refine product results"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-5 shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-ink">Refine search</h3>
              <button type="button" onClick={onClose} aria-label="Close filters" className="icon-btn">
                <FiX />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              <label className="block">
                <span className="text-sm font-semibold text-ink">Max price</span>
                <input
                  type="range"
                  min={1000}
                  max={150000}
                  step={1000}
                  value={state.maxPrice}
                  onChange={(e) => setState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="mt-2 w-full accent-primary"
                />
                <strong className="mt-1 block text-sm text-primary">{formatPrice(state.maxPrice)}</strong>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-ink">Brand</span>
                <select
                  value={state.selectedBrand}
                  onChange={(e) => setState((prev) => ({ ...prev, selectedBrand: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === 'All' ? 'All brands' : brand}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="text-sm font-semibold text-ink">Specs</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {allSpecs.map((spec) => (
                    <label key={spec} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                      <input
                        type="checkbox"
                        checked={state.selectedSpecs.includes(spec)}
                        onChange={() => toggleSpec(spec)}
                        className="accent-primary"
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={onClose} className="btn-primary flex-1">
                  Apply filters
                </button>
                <button type="button" onClick={reset} className="btn-secondary flex-1">
                  Reset
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
