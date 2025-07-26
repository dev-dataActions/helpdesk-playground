/**
 * Authentication utility functions
 */

/**
 * Get the current authentication token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("authToken");
}

/**
 * Check if a JWT token is valid and not expired
 * @param {string} token - The JWT token to validate
 * @returns {boolean} True if token is valid, false otherwise
 */
export function isTokenValid(token) {
  if (!token) {
    return false;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp && payload.exp > currentTime;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}

/**
 * Get user information from JWT token
 * @param {string} token - The JWT token
 * @returns {object|null} User information or null if invalid
 */
export function getUserFromToken(token) {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));
    return {
      username: payload.username,
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
}
