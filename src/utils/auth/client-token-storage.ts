// TODO improve typing
export type Token = "firebase_token" | "app-token";

export function storeToken(token: string): void {
  try {
    localStorage.setItem("app-token", token);
  } catch (error) {
    console.error("Error setting token in localStorage:", error);
  }
}

export function getStoredToken(token: Token): string | null {
  try {
    return localStorage.getItem(token);
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
}

export function removeToken(token: Token): void {
  try {
    localStorage.removeItem(token);
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
}
