/**
 * Security & Sanitization Utilities for Lumina Grand Resort Application
 * Provides enterprise-grade input sanitization, XSS mitigation, secure storage, and validation.
 */

/**
 * Strips dangerous HTML tags, javascript: protocols, and executable script fragments
 * @param {string} input 
 * @returns {string} Sanitized string
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:[^"'\s]*/gi, '')
    .replace(/vbscript:[^"'\s]*/gi, '')
    .replace(/data:text\/html[^"'\s]*/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^"'\s>]+/gi, '')
    .trim();
}

/**
 * Validates and normalizes 10-digit mobile number
 * @param {string} phone 
 * @returns {string} 10-digit string or empty
 */
export function sanitizePhone(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  return digits.slice(-10);
}

/**
 * Checks if a phone number is a valid 10-digit mobile number
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const clean = sanitizePhone(phone);
  return /^[6-9]\d{9}$/.test(clean);
}

/**
 * Checks if an email is well-formed
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Sanitizes and bounds numeric price
 * @param {number|string} price 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function sanitizePrice(price, min = 1, max = 50000) {
  const num = Number(price);
  if (isNaN(num) || num < min) return min;
  if (num > max) return max;
  return Math.round(num);
}

/**
 * Safe local storage wrapper with fallback
 */
export const safeStorage = {
  getItem(key, fallback = null) {
    try {
      if (typeof window === 'undefined') return fallback;
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item);
    } catch (e) {
      console.warn(`[Security Storage] Failed to read ${key}:`, e);
      return fallback;
    }
  },
  setItem(key, value) {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[Security Storage] Failed to write ${key}:`, e);
      return false;
    }
  },
  removeItem(key) {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Security Storage] Failed to remove ${key}:`, e);
    }
  }
};
