import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCompare } from '../context/CompareContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import Rating from '../components/common/Rating.jsx';
import PageTransition from '../components/common/PageTransition.jsx';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

const rows = [
  { label: 'Price', get: (p) => formatPrice(p.price) },
  { label: 'MRP', get: (p) => formatPrice(p.originalPrice) },
  { label: 'Brand', get: (p) => p.brand },
  { label: 'Category', get: (p) => p.category },
  { label: 'Rating', get: (p) => `${p.rating} ★ (${p.reviewsCount.toLocaleString('en-IN')})` },
  { label: 'Specs', get: (p) => p.specs.join(', ') },
  { label: 'Availability', get: (p) => (p.inStock ? 'In stock' : 'Out of stock') }
];

export default function Compare() {
  const { compareProducts, toggleCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  return (
    <PageTransition>
      <section className="mx-4 mt-6 sm:mx-6">
        <div className="section-heading mb-6 flex items-end justify-between">
          <div>
            <h2>Compare products</h2>
            <p>Pick up to 3 products from the shop to compare side by side.</p>
          </div>
          {compareProducts.length > 0 && (
            <button type="button" onClick={clearCompare} className="text-sm font-semibold text-muted hover:text-red-500">
              Clear all
            </button>
          )}
        </div>

        {compareProducts.length === 0 ? (
          <div className="card-shell flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-muted">You haven't added any products to compare yet.</p>
            <Link to="/shop" className="btn-primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-border bg-white">
              <thead>
                <tr>
                  <th className="w-32 bg-surface2 p-4 text-left text-xs font-semibold uppercase text-muted">Product</th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="border-l border-border p-4 text-left">
                      <button
                        type="button"
                        onClick={() => toggleCompare(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="mb-2 ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-surface2 text-muted hover:text-red-500"
                      >
                        <FiX size={12} />
                      </button>
                      <img src={product.image} alt={product.name} className="mx-auto h-24 w-24 rounded-xl object-cover" />
                      <p className="mt-2 text-center text-sm font-semibold text-ink">{product.name}</p>
                      <div className="mt-2 flex justify-center">
                        <Rating value={product.rating} />
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product.id, 1)}
                        className="btn-primary mt-3 w-full !py-2 text-xs"
                      >
                        Add to cart
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th className="border-t border-border bg-surface2 p-4 text-left text-xs font-semibold uppercase text-muted">
                      {row.label}
                    </th>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="border-l border-t border-border p-4 text-center text-sm text-ink">
                        {row.get(product)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
