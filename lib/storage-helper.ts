/**
 * Helper functions for working with localStorage that handle Safari's quirks
 * and provide fallbacks when localStorage is not available
 */

// In-memory fallback storage when localStorage is not available
const memoryStorage: Record<string, string> = {}

/**
 * Safely get an item from localStorage with fallback to memory storage
 */
export function getStorageItem(key: string): string | null {
  try {
    // Try to use localStorage first
    const value = localStorage.getItem(key)
    return value
  } catch (error) {
    console.warn("localStorage access failed, using memory storage fallback", error)
    // Fall back to in-memory storage
    return memoryStorage[key] || null
  }
}

/**
 * Safely set an item in localStorage with fallback to memory storage
 */
export function setStorageItem(key: string, value: string): void {
  try {
    // Try to use localStorage first
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn("localStorage access failed, using memory storage fallback", error)
    // Fall back to in-memory storage
    memoryStorage[key] = value
  }
}

/**
 * Safely remove an item from localStorage with fallback to memory storage
 */
export function removeStorageItem(key: string): void {
  try {
    // Try to use localStorage first
    localStorage.removeItem(key)
  } catch (error) {
    console.warn("localStorage access failed, using memory storage fallback", error)
    // Fall back to in-memory storage
    delete memoryStorage[key]
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

