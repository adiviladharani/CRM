export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface InventoryItem {
  id: string
  itemCode: string
  itemName: string
  category: string
  stockQuantity: number
  reorderLevel: number
  unitPrice: number
  warehouse: string
  supplier: string
  description: string
  lastUpdated: string // ISO date string
}

/** Payload used by the Add/Edit form (id + itemCode are managed separately). */
export type InventoryItemFormValues = Omit<InventoryItem, 'id' | 'itemCode' | 'lastUpdated'> & {
  itemCode?: string
}

export interface NotificationState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}
