import logger from "../error-handling/logger";

export function safelyParseJSON<T>(jsonString: string | null): T | null {
  try {
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (e) {
    return null;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error(`Error setting ${key} in localStorage: ${error}`);
  }
}

export function getLocalStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return safelyParseJSON<T>(value);
  } catch (error) {
    logger.error(`Error retrieving ${key} from localStorage: ${error}`);
    return null;
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    logger.error(`Error removing ${key} from localStorage: ${error}`);
  }
}
