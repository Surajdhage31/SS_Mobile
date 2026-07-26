export function filterProducts(products, state) {
  const normalizedSearch = state.searchTerm.trim().toLowerCase();

  let filtered = products.filter((product) => {
    const matchesCategory = state.currentCategory === 'All' || product.category === state.currentCategory;
    const matchesSearch =
      normalizedSearch === '' ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.desc.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch);
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
    default:
      break;
  }

  return filtered;
}
