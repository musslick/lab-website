/**
 * Helper functions for debugging localStorage issues
 */

/**
 * Get all items from localStorage with their size information
 */
export const getStorageInfo = () => {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) || '';
    const value = localStorage.getItem(key) || '';
    const size = new Blob([value]).size / 1024; // Size in KB
    items.push({ 
      key, 
      value: value.length > 100 ? `${value.substring(0, 100)}...` : value,
      size: Math.round(size * 100) / 100 
    });
  }
  return items;
};

/**
 * Get a specific localStorage item
 */
export const getStorageItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

/**
 * Create a backup of all localStorage items
 */
export const backupStorage = () => {
  const backup: Record<string, string> = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      if (value) backup[key] = value;
    }
  }
  
  return backup;
};

/**
 * Restore localStorage from backup
 */
export const restoreStorage = (backup: Record<string, string>) => {
  // Clear existing storage
  localStorage.clear();
  
  // Restore from backup
  Object.entries(backup).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

/**
 * Clean up localStorage for a specific key
 * by removing duplicate entries or entries with null/undefined values
 */
export const cleanupStorage = (key: string): boolean => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return false;
    
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return false;
    
    // Remove duplicate IDs
    const seen = new Set();
    const cleaned = parsed.filter((item: any) => {
      if (!item || !item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    
    // Save back to localStorage
    localStorage.setItem(key, JSON.stringify(cleaned));
    return true;
  } catch (e) {
    console.error("Error cleaning up localStorage:", e);
    return false;
  }
};

/**
 * Reset news items in localStorage
 */
export const resetNewsItems = () => {
  localStorage.removeItem('newsItems');
  return true;
};
