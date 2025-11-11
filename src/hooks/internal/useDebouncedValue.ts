// simple debounced value hook
import { useState, useEffect } from "react";

/**
 * useDebouncedValue
 * Returns a debounced version of `value` that only updates after `delay` ms of no changes.
 */
export default function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}