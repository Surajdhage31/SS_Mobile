import { createContext, useContext, useMemo, useState, useRef, useEffect } from 'react';
import { products } from '../data/products.js';

const CompareContext = createContext(null);
const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);
  const [notice, setNotice] = useState('');
  const timerRef = useRef(null);

  // Clear pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toggleCompare = (productId) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= MAX_COMPARE) {
        setNotice(`You can compare up to ${MAX_COMPARE} products at a time.`);
        
        // Clear any existing active timer before starting a new one
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setNotice(''), 2500);
        
        return prev;
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareIds([]);
  const isComparing = (productId) => compareIds.includes(productId);

  const compareProducts = useMemo(
    () => compareIds.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [compareIds]
  );

  return (
    <CompareContext.Provider
      value={{ compareIds, compareProducts, toggleCompare, clearCompare, isComparing, notice, MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within a CompareProvider');
  return ctx;
}