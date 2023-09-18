export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length !== 2) {
    return null;
  }

  const cookieValue = parts[1];
  const endOfValueIndex = cookieValue.indexOf(";");

  if (endOfValueIndex === -1) {
    return cookieValue; // Return the whole value if there's no semicolon.
  } else {
    return cookieValue.substring(0, endOfValueIndex);
  }
};
