import { useCallback, useEffect, useState } from "react";

function safelyParseJSON<T>(jsonString: string | null): T | null {
  try {
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (e) {
    return null;
  }
}

function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage: ${error}`);
  }
}

function getLocalStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return safelyParseJSON<T>(value);
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage: ${error}`);
    return null;
  }
}

function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage: ${error}`);
  }
}

type UseSyncedLocalStorageReturnType<T> = [
  T | null,
  (value: T) => void,
  () => void
];

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
