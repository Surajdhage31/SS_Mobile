import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import MobileMenu from './components/layout/MobileMenu.jsx';
import Footer from './components/layout/Footer.jsx';
import BottomNav from './components/layout/BottomNav.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import SearchOverlay from './components/search/SearchOverlay.jsx';
import ChatAssistant from './components/chatbot/ChatAssistant.jsx';
import CompareBar from './components/compare/CompareBar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Compare from './pages/Compare.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] pb-20 sm:pb-0">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />

      <AnimatePresence mode="popLayout">
        <Routes location={location} key={location.key || location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />

      <BottomNav onOpenSearch={() => setSearchOpen(true)} onOpenCart={() => setCartOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenChat={() => setChatOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CompareBar />
      <ChatAssistant open={chatOpen} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
    </div>
  );
}