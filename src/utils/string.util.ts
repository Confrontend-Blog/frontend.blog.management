/**
 * Converts a blog title to a URL-friendly slug format by replacing spaces with dashes
 * and removing any non-alphanumeric or dash characters
 * @param title - The blog title to convert to a slug
 * @returns A URL-friendly slug string with only alphanumeric and dash characters
 */
export const titleToSlug = (title: string) =>
  title
    .trim()
    .toLowerCase()
    .replace(SeoStopWords, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

/**
 * Truncates a string to 100 characters if it is longer than 100 characters.
 * Adds "..." at the end of the truncated string.
 * @param {string} str - The string to be truncated.
 * @returns {string} - The truncated string.
 */
export const truncateString = (str: string) =>
  str.length > 100 ? str.substring(0, 100) + "..." : str;

// A list of stop words commonly found in URLs that can negatively affect SEO
const SeoStopWords =
  /\b(a|an|and|as|at|be|by|for|from|has|he|in|is|it|its|of|on|that|the|to|was|were|will|with)\b/gi;

export const urlToPAgeTile = (input: string): string => {
  const stringWithoutSlash = input.startsWith("/") ? input.slice(1) : input;

  return stringWithoutSlash
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};
