import { NavLink } from 'react-router-dom';
import { FiHome, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext.jsx';

export default function BottomNav({ onOpenSearch, onOpenCart }) {
  const { itemCount } = useCart();

  const itemClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 text-[11px] ${isActive ? 'text-primary' : 'text-muted'}`;

  return (
    <nav
      aria-label="Thumb-zone navigation"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-white/95 py-2 backdrop-blur sm:hidden"
    >
      <NavLink to="/" className={itemClass}>
        <FiHome className="text-lg" />
        Home
      </NavLink>
      <button type="button" onClick={onOpenSearch} className="flex flex-col items-center gap-0.5 text-[11px] text-muted">
        <FiSearch className="text-lg" />
        Search
      </button>
      <button type="button" onClick={onOpenCart} className="relative flex flex-col items-center gap-0.5 text-[11px] text-muted">
        <FiShoppingCart className="text-lg" />
        Cart
        {itemCount > 0 && <span className="pill !-top-1 !-right-2">{itemCount}</span>}
      </button>
      <NavLink to="/contact" className={itemClass}>
        <FiUser className="text-lg" />
        Account
      </NavLink>
    </nav>
  );
}
