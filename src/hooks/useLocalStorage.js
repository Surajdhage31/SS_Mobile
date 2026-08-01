import { useEffect, useState } from 'react';

// Persists state to localStorage under `key`, restoring it on mount.
// Used for cart, wishlist, and compare so they survive a page refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota / serialization errors — non-critical.
    }
  }, [key, value]);

  return [value, setValue];
}
