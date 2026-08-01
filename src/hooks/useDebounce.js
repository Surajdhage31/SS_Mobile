import { useEffect, useState } from 'react';

// Debounces a fast-changing value (e.g. search input) so expensive
// work (filtering, API calls) only runs after typing pauses.
export function useDebounce(value, delayMs = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
