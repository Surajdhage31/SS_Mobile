import { useState } from 'react';
import Hero from '../components/home/Hero.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import ProductSection from '../components/home/ProductSection.jsx';
import OfferBanner from '../components/home/OfferBanner.jsx';
import Reviews from '../components/home/Reviews.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import QuickViewModal from '../components/product/QuickViewModal.jsx';
import PageTransition from '../components/common/PageTransition.jsx';

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <PageTransition>
      <Hero />
      <CategoryGrid />

      <ProductSection
        id="featured"
        title="Featured products"
        subtitle="Trusted devices and accessories chosen for value and performance."
        filter={(p) => p.tags.includes('featured')}
        onQuickView={setQuickViewProduct}
      />

      <ProductSection
        id="trending"
        title="Trending phones"
        subtitle="What everyone's upgrading to this month."
        filter={(p) => p.tags.includes('trending')}
        onQuickView={setQuickViewProduct}
      />

      <OfferBanner />

      <ProductSection
        id="bestsellers"
        title="Best sellers"
        subtitle="Fan favorites, backed by thousands of happy customers."
        filter={(p) => p.tags.includes('bestseller')}
        onQuickView={setQuickViewProduct}
      />

      <ProductSection
        id="new-launches"
        title="New launches"
        subtitle="Fresh arrivals — be the first to upgrade."
        filter={(p) => p.tags.includes('newLaunch')}
        onQuickView={setQuickViewProduct}
      />

      <ProductSection
        id="accessories"
        title="Accessories"
        subtitle="Cases, chargers, earbuds, and everything in between."
        filter={(p) => p.category === 'Accessories'}
        viewAllHref="/shop?category=Accessories"
        onQuickView={setQuickViewProduct}
      />

      <Reviews />
      <WhyChooseUs />

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </PageTransition>
  );
}
