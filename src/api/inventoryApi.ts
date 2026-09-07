import type { InventoryItem, InventoryItemFormValues } from '../types/inventory'
import { mockInventory } from '../data/mockInventory'
import { generateId, generateItemCode } from '../utils/inventory'

/**
 * This module stands in for a real backend/REST API.
 *
 * The app has no server, so instead of calling `fetch('/api/items')` these
 * functions read and write the same `localStorage` key the app has always
 * used, and wrap the result in a Promise (with a small simulated delay) so
 * that TanStack Query can treat it exactly like an async network call.
 *
 * Swapping this file's internals for real `fetch`/`axios` calls later would
 * require no changes anywhere else — `useInventory` and every page that
 * consumes it only ever see plain async functions.
 */

const STORAGE_KEY = 'inventory-mgmt:items:v1'
const SIMULATED_LATENCY_MS = 150

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function readFromStorage(): InventoryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as InventoryItem[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // fall through to seed data
  }
  return mockInventory
}

function writeToStorage(items: InventoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // storage may be unavailable (private mode, quota) — safe to ignore for this demo
  }
}

/** GET /items — fetches the current inventory list. */
export async function fetchInventoryItems(): Promise<InventoryItem[]> {
  return delay(readFromStorage())
}

/** POST /items — creates a new inventory item. */
export async function createInventoryItem(values: InventoryItemFormValues): Promise<InventoryItem> {
  const current = readFromStorage()
  const newItem: InventoryItem = {
    ...values,
    id: generateId(),
    itemCode: generateItemCode(current),
    lastUpdated: new Date().toISOString(),
  }
  writeToStorage([newItem, ...current])
  return delay(newItem)
}

/** PUT /items/:id — updates an existing inventory item. */
export async function updateInventoryItem(id: string, values: InventoryItemFormValues): Promise<InventoryItem> {
  const current = readFromStorage()
  let updated: InventoryItem | undefined
  const next = current.map((item) => {
    if (item.id !== id) return item
    updated = { ...item, ...values, lastUpdated: new Date().toISOString() }
    return updated
  })
  writeToStorage(next)
  if (!updated) throw new Error(`Inventory item ${id} was not found.`)
  return delay(updated)
}

/** DELETE /items/:id — removes an inventory item. */
export async function deleteInventoryItem(id: string): Promise<string> {
  const current = readFromStorage()
  const next = current.filter((item) => item.id !== id)
  writeToStorage(next)
  return delay(id)
}
