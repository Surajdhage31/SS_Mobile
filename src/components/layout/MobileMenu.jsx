import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiMessageCircle } from 'react-icons/fi';
import { storeInfo } from '../../data/store.js';

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=All', label: 'Categories' },
  { to: '/compare', label: 'Compare' },
  { to: '/contact', label: 'Contact' }
];

export default function MobileMenu({ open, onClose, onOpenChat }) {
  const navigate = useNavigate();

  const handleLinkClick = (to) => {
    onClose(); // Close mobile drawer FIRST so backdrop unmounts completely
    setTimeout(() => {
      navigate(to);
    }, 50);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-5 shadow-soft lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <strong className="text-ink">Menu</strong>
              <button type="button" onClick={onClose} aria-label="Close menu" className="icon-btn">
                <FiX />
              </button>
            </div>
            <nav className="mt-4 flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLinkClick(link.to)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-surface2"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-surface2"
              >
                <FiMessageCircle /> AI Assistant
              </button>
            </nav>
            <div className="mt-6 rounded-xl bg-surface2 p-4 text-xs text-muted">
              <p className="font-semibold text-ink">{storeInfo.name}</p>
              <p className="mt-1">{storeInfo.address}</p>
              <p className="mt-1">{storeInfo.phone}</p>
              <p className="mt-1">{storeInfo.hours}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}