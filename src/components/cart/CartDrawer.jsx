import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext.jsx';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleCheckout = (e) => {
    e.preventDefault();
    setPlaced(true);
    setTimeout(() => {
      clearCart();
      setPlaced(false);
      setForm({ name: '', email: '', phone: '' });
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-lg font-bold text-ink">Your cart</h3>
              <button type="button" onClick={onClose} aria-label="Close cart" className="icon-btn">
                <FiX />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">Your cart is empty. Add some devices to get started.</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">{item.product.name}</p>
                        <p className="text-xs text-muted">{formatPrice(item.product.price)}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="icon-btn h-7 w-7"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="text-xs" />
                          </button>
                          <span className="w-4 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="icon-btn h-7 w-7"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="text-xs" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="icon-btn ml-auto h-7 w-7 text-red-500"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="text-xs" />
                          </button>
                        </div>
                      </div>
                      <strong className="text-sm text-ink">{formatPrice(item.product.price * item.quantity)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border px-5 py-4">
                <div className="mb-1 flex justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <strong className="text-ink">{formatPrice(subtotal)}</strong>
                </div>
                <div className="mb-3 flex justify-between text-sm text-muted">
                  <span>Shipping</span>
                  <strong className="text-emerald-600">Free</strong>
                </div>
                <div className="mb-4 flex justify-between border-t border-border pt-3 text-base font-bold text-ink">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {placed ? (
                  <p className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
                    Order placed! We'll contact you shortly.
                  </p>
                ) : (
                  <form onSubmit={handleCheckout} className="space-y-2">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <button type="submit" className="btn-primary w-full">
                      Place order
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
