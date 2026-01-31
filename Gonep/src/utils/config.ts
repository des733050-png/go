/**
 * Configuration utilities
 * Centralized configuration management with environment variable support
 */

/**
 * Get base URL from environment variable or fallback to current origin
 */
export function getBaseUrl(): string {
  // In Vite, environment variables are accessed via import.meta.env
  // VITE_ prefix is required for client-side variables
  if (import.meta.env.VITE_BASE_URL) {
    return import.meta.env.VITE_BASE_URL;
  }
  
  // Fallback to current origin if available (browser environment)
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Final fallback (should not be reached in production)
  return 'https://gonepharm.com/';
}

/**
 * Get API base URL from environment variable
 */
export function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Default API URL based on environment
  if (import.meta.env.PROD) {
    return 'https://gonepbackend.vercel.app/api';
  }
  
  return 'http://localhost:8000/api';
}

export const BASE_URL = getBaseUrl();
export const API_BASE_URL = getApiBaseUrl();

