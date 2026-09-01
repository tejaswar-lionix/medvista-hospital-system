const PREFIX = 'hospital_app_';

function getKey(key: string): string {
  return `${PREFIX}${key}`;
}

export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(getKey(key));
    if (value === null) return null;
    return JSON.parse(value) as T;
  } catch {
    return localStorage.getItem(getKey(key)) as unknown as T;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getKey(key), JSON.stringify(value));
  } catch {
    console.error(`Failed to save to localStorage: ${key}`);
  }
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getKey(key));
}

export function clear(): void {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
  keys.forEach((k) => localStorage.removeItem(k));
}
