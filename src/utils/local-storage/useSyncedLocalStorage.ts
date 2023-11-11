import { useCallback, useEffect, useState } from "react";

import {
  getLocalStorage,
  removeLocalStorage,
  safelyParseJSON,
  setLocalStorage,
} from "./local-storage-util";

type UseSyncedLocalStorageReturnType<T> = [
  T | null,
  (value: T) => void,
  () => void
];

/**
 * Custom hook for synchronizing a piece of state with local storage.
 * It provides an easy way to store, retrieve, and update data in local storage
 * in a component, with the state staying in sync across different browser tabs.
 *
 * @param {string} key - The key to be used in local storage for storing the data.
 * @param {T} initialValue - The initial value of the state, if not already set in local storage.
 * @returns {UseSyncedLocalStorageReturnType<T>} A tuple containing the stored value,
 *          a setter function to update the value, and a remover function to delete the key from local storage.
 * @template T - The type of the data to be stored in local storage.
 */
export function useSyncedLocalStorage<T>(
  key: string,
  initialValue: T
): UseSyncedLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<T | null>(
    () => getLocalStorage<T>(key) || initialValue
  );

  // useCallback is used to keep function instance stable (see useEffect dependency array)
  const handleStorageEvent = useCallback(
    (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(safelyParseJSON<T>(event.newValue));
      }
    },
    [key]
  );

  // Register `storage` event. This event be dispatched from any browser tab.
  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, [handleStorageEvent]);

  const setStorage = useCallback(
    (value: T) => {
      setStoredValue(value);
      setLocalStorage(key, value);
    },
    [key]
  );

  const removeStorage = useCallback(() => {
    setStoredValue(null);
    removeLocalStorage(key);
  }, [key]);

  return [storedValue, setStorage, removeStorage];
}
