import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCompare } from '../../context/CompareContext.jsx';

export default function CompareBar() {
  const { compareProducts, toggleCompare, clearCompare, notice } = useCompare();

  return (
    <AnimatePresence>
      {compareProducts.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-14 z-30 mx-auto w-full max-w-2xl px-4 sm:bottom-4"
        >
          <div className="card-shell flex items-center gap-3 p-3">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto">
              {compareProducts.map((product) => (
                <div key={product.id} className="relative shrink-0">
                  <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    aria-label={`Remove ${product.name} from compare`}
                    className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-white"
                  >
                    <FiX size={10} />
                  </button>
                </div>
              ))}
            </div>
            <Link to="/compare" className="btn-primary shrink-0 !px-4 !py-2 text-xs">
              Compare ({compareProducts.length})
            </Link>
            <button type="button" onClick={clearCompare} className="text-xs font-medium text-muted hover:text-red-500">
              Clear
            </button>
          </div>
          {notice && <p className="mt-1 text-center text-xs font-medium text-accent">{notice}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
