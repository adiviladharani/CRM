import type { InventoryItem, StockStatus } from '../types/inventory'

export const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Stationery',
  'Apparel',
  'Groceries & FMCG',
  'Hardware & Tools',
  'Packaging',
  'Software & Licenses',
  'Sports Equipment',
  'Automotive Parts',
] as const

export const WAREHOUSES = [
  'Warehouse A - Bengaluru',
  'Warehouse B - Mumbai',
  'Warehouse C - Delhi NCR',
  'Warehouse D - Chennai',
  'Warehouse E - Hyderabad',
  'Cold Storage - Pune',
] as const

/** Derives the stock status purely from quantity vs. reorder level. */
export function getStockStatus(item: Pick<InventoryItem, 'stockQuantity' | 'reorderLevel'>): StockStatus {
  if (item.stockQuantity <= 0) return 'Out of Stock'
  if (item.stockQuantity <= item.reorderLevel) return 'Low Stock'
  return 'In Stock'
}

export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

/** Generates the next sequential item code, e.g. ITM-0001, ITM-0042. */
export function generateItemCode(existing: InventoryItem[]): string {
  const max = existing.reduce((acc, item) => {
    const match = item.itemCode.match(/(\d+)$/)
    const n = match ? parseInt(match[1], 10) : 0
    return Math.max(acc, n)
  }, 0)
  return `ITM-${String(max + 1).padStart(4, '0')}`
}

export function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
