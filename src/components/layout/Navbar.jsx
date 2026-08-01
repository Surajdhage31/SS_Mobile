import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiMenu, FiMessageCircle } from 'react-icons/fi';
import { MdCompareArrows } from 'react-icons/md';
import { useCart } from '../../context/CartContext.jsx';
import { useCompare } from '../../context/CompareContext.jsx';

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=All', label: 'Categories' },
  { to: '/compare', label: 'Compare' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar({ onOpenSearch, onOpenCart, onOpenMenu, onOpenChat }) {
  const { itemCount } = useCart();
  const { compareIds } = useCompare();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 12 !== scrolled) {
        setScrolled(window.scrollY > 12);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrolled]);

  const handleNavClick = (e, to) => {
    // Force clean page navigation & scroll-to-top when clicking navigation links
    if (location.pathname + location.search === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-30 flex items-center justify-between gap-4 border-b px-4 py-3 transition-all duration-300 sm:px-6 ${
        scrolled ? 'border-border bg-white/90 shadow-card backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-extrabold text-white">
          S
        </span>
        <span className="leading-tight">
          <strong className="block text-sm font-extrabold text-ink">SS Mobile</strong>
          <small className="block text-[11px] text-muted">Official Store</small>
        </span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm font-medium text-ink lg:flex">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            onClick={(e) => handleNavClick(e, link.to)}
            className={({ isActive }) =>
              `relative transition-colors hover:text-primary ${
                isActive ? 'text-primary font-semibold' : ''
              }`
            }
          >
            {link.label}
            {link.label === 'Compare' && compareIds.length > 0 && (
              <span className="ml-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                {compareIds.length}
              </span>
            )}
          </NavLink>
        ))}
        <button type="button" onClick={onOpenChat} className="flex items-center gap-1.5 hover:text-primary">
          <FiMessageCircle /> AI Assistant
        </button>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <button type="button" onClick={onOpenSearch} aria-label="Search" className="icon-btn">
          <FiSearch />
        </button>
        <Link to="/compare" aria-label="Compare products" className="icon-btn hidden sm:inline-flex">
          <MdCompareArrows />
          {compareIds.length > 0 && <span className="pill">{compareIds.length}</span>}
        </Link>
        <button type="button" onClick={onOpenCart} aria-label="Open cart" className="icon-btn">
          <FiShoppingCart />
          {itemCount > 0 && <span className="pill">{itemCount}</span>}
        </button>
        <button type="button" onClick={onOpenMenu} aria-label="Open menu" className="icon-btn lg:hidden">
          <FiMenu />
        </button>
      </div>
    </motion.header>
  );
}