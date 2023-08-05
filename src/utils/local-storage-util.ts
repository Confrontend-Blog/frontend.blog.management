export function setLocalStorage({
  key,
  value,
}: {
  key: string;
  value: object;
}): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} from localStorage: ${error}`);
  }
}

export function getLocalStorage(key: string): string | object | null {
  try {
    const value = localStorage.getItem(key);
    return safelyParseJSON(value);
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage: ${error}`);
    return null;
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage: ${error}`);
  }
}

function safelyParseJSON(jsonString: string | null) {
  try {
    if (jsonString === null) {
      return jsonString;
    }
    const parsed = JSON.parse(jsonString);
    return parsed && typeof parsed === "object" ? parsed : jsonString;
  } catch (e) {
    return jsonString;
  }
}
