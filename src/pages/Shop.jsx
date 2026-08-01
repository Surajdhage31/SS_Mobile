import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSliders } from 'react-icons/fi';
import { fetchProducts, filterProducts } from '../services/productService.js';
import { categories } from '../data/products.js';
import ProductCard from '../components/product/ProductCard.jsx';
import QuickViewModal from '../components/product/QuickViewModal.jsx';
import FilterDrawer from '../components/filters/FilterDrawer.jsx';
import { ProductGridSkeleton } from '../components/common/Skeleton.jsx';
import PageTransition from '../components/common/PageTransition.jsx';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [state, setState] = useState({
    currentCategory: searchParams.get('category') || 'All',
    searchTerm: searchParams.get('q') || '',
    sortBy: 'featured',
    maxPrice: 150000,
    selectedBrand: 'All',
    selectedSpecs: []
  });

  useEffect(() => {
    let isMounted = true;
    fetchProducts().then((data) => {
      if (isMounted) {
        setAllProducts(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const q = searchParams.get('q') || '';
    setState((prev) => ({
      ...prev,
      currentCategory: category,
      searchTerm: q
    }));
  }, [searchParams]);

  const filtered = useMemo(() => filterProducts(allProducts, state), [allProducts, state]);

  const setCategory = (category) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (category === 'All') next.delete('category');
      else next.set('category', category);
      return next;
    });
  };

  return (
    <PageTransition>
      <section className="mx-4 mt-6 sm:mx-6">
        <div className="section-heading mb-6">
          <h2>Shop all products</h2>
          <p>
            {state.searchTerm
              ? `Results for "${state.searchTerm}"`
              : 'Trusted devices and accessories chosen for value and performance.'}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-1 flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategory(category)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  state.currentCategory === category
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-ink hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button type="button" onClick={() => setFilterOpen(true)} className="icon-btn w-auto gap-2 px-4 text-sm">
            <FiSliders /> Filters
          </button>

          <label className="sr-only" htmlFor="sortSelect">
            Sort products
          </label>
          <select
            id="sortSelect"
            value={state.sortBy}
            onChange={(e) => setState((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="rounded-full border border-border px-4 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted">
            No products match your search. Try a different keyword or reset your filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        )}
      </section>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} state={state} setState={setState} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </PageTransition>
  );
}