import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { getBotResponse, quickReplyOptions } from '../../services/chatbotService.js';

const INITIAL_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: "Hi there! Welcome to SS Mobile. I'm your virtual assistant. Ask me about products, prices, specs, offers, or store info!"
};

// Reusable AI Assistant widget. Only `getBotResponse` needs to change
// to swap the rule-based engine for a real LLM/API call later.
export default function ChatAssistant({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(trimmed);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Open chat"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className={`fixed bottom-20 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-primary text-2xl text-white shadow-lift sm:bottom-6 ${
          open ? 'hidden' : ''
        }`}
      >
        <FiMessageCircle />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            aria-label="Chat with SS Mobile"
            className="fixed bottom-0 right-0 z-40 flex h-[80vh] w-full max-w-sm flex-col rounded-t-2xl bg-white shadow-soft sm:bottom-6 sm:right-6 sm:h-[36rem] sm:rounded-2xl"
          >
            <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-lg">🤖</span>
                <div>
                  <strong className="block text-sm">SS Mobile Assistant</strong>
                  <small className="block text-xs text-white/80">Online • Usually replies instantly</small>
                </div>
              </div>
              <button type="button" onClick={onClose} aria-label="Close chat" className="rounded-full p-1.5 hover:bg-white/20">
                <FiX />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-bg px-4 py-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <span className="shrink-0 text-lg">{msg.role === 'bot' ? '🤖' : '🧑'}</span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                      msg.role === 'bot' ? 'bg-white text-ink shadow-card' : 'bg-primary text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <span className="text-lg">🤖</span>
                  <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-card">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2">
              {quickReplyOptions.map((opt) => (
                <button
                  key={opt.text}
                  type="button"
                  onClick={() => sendMessage(opt.message)}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-primary hover:bg-primary-light"
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type a message..."
                autoComplete="off"
                className="flex-1 rounded-full border border-border px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white"
              >
                <FiSend size={14} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
