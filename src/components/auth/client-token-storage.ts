type token = "firebase_token";

export function storeToken(token: string): void {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error setting token in localStorage:", error);
  }
}

export function getStoredToken(token: token): string | null {
  try {
    return localStorage.getItem(token);
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
}

export function removeToken(token: string): void {
  try {
    localStorage.removeItem(token);
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
}
