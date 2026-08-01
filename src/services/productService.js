import { products } from '../data/products.js';

// This service simulates network latency so components already handle
// loading states correctly. When the Express/MongoDB backend is ready,
// only the bodies of these functions change (to `fetch('/api/products')`
// etc.) — every component that imports this file stays the same.

const LATENCY_MS = 350;

function delay(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), LATENCY_MS));
}

export async function fetchProducts() {
  return delay(products);
}

export async function fetchProductById(id) {
  return delay(products.find((p) => p.id === Number(id)) || null);
}

export function filterProducts(list, state) {
  const term = state.searchTerm.trim().toLowerCase();

  let filtered = list.filter((product) => {
    const matchesCategory = state.currentCategory === 'All' || product.category === state.currentCategory;
    const matchesSearch =
      term === '' ||
      product.name.toLowerCase().includes(term) ||
      product.desc.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term);
    const matchesPrice = product.price <= state.maxPrice;
    const matchesBrand = state.selectedBrand === 'All' || product.brand === state.selectedBrand;
    const matchesSpecs =
      state.selectedSpecs.length === 0 || state.selectedSpecs.every((spec) => product.specs.includes(spec));

    return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesSpecs;
  });

  switch (state.sortBy) {
    case 'price-low':
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return filtered;
}

export function getSearchSuggestions(list, term, limit = 6) {
  const normalized = term.trim().toLowerCase();
  if (!normalized) return [];
  return list
    .filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) ||
        p.brand.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized)
    )
    .slice(0, limit);
}
