/**
 * Physical product format for Lystosyk.
 * Same studio song flow; only the printed card (step 4 + ops compositor) differs.
 */
export type ProductFormat = 'qr' | 'sound';

export const PRODUCT_FORMAT_STORAGE_KEY = 'studio-product-format';

export const SOUND_CARD_SLOGAN = 'Коли важливі слова звучать';

export function isProductFormat(value: unknown): value is ProductFormat {
  return value === 'qr' || value === 'sound';
}

export function getStoredProductFormat(): ProductFormat {
  if (typeof window === 'undefined') return 'qr';
  const stored = sessionStorage.getItem(PRODUCT_FORMAT_STORAGE_KEY);
  return isProductFormat(stored) ? stored : 'qr';
}

export function setStoredProductFormat(format: ProductFormat): void {
  sessionStorage.setItem(PRODUCT_FORMAT_STORAGE_KEY, format);
}

export function clearStoredProductFormat(): void {
  sessionStorage.removeItem(PRODUCT_FORMAT_STORAGE_KEY);
}
