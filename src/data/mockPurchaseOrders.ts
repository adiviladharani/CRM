import { WAREHOUSES } from '../utils/inventory'

export type PurchaseOrderStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Received'

export interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  warehouse: string
  itemCount: number
  totalValue: number
  orderDate: string
  expectedDate: string
  status: PurchaseOrderStatus
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: 'po-1', poNumber: 'PO-2026-0142', supplier: 'Dell Technologies', warehouse: WAREHOUSES[1], itemCount: 12, totalValue: 449982, orderDate: '2026-08-18', expectedDate: '2026-09-05', status: 'Approved' },
  { id: 'po-2', poNumber: 'PO-2026-0143', supplier: 'Bosch Power Tools', warehouse: WAREHOUSES[0], itemCount: 8, totalValue: 39992, orderDate: '2026-08-20', expectedDate: '2026-09-02', status: 'Pending Approval' },
  { id: 'po-3', poNumber: 'PO-2026-0144', supplier: 'JK Paper Ltd', warehouse: WAREHOUSES[4], itemCount: 40, totalValue: 74700, orderDate: '2026-08-22', expectedDate: '2026-09-01', status: 'Received' },
  { id: 'po-4', poNumber: 'PO-2026-0145', supplier: 'Havells India', warehouse: WAREHOUSES[3], itemCount: 20, totalValue: 37980, orderDate: '2026-08-25', expectedDate: '2026-09-08', status: 'Draft' },
  { id: 'po-5', poNumber: 'PO-2026-0146', supplier: '3M India', warehouse: WAREHOUSES[2], itemCount: 150, totalValue: 29850, orderDate: '2026-08-27', expectedDate: '2026-09-10', status: 'Pending Approval' },
  { id: 'po-6', poNumber: 'PO-2026-0147', supplier: 'Godrej Interio', warehouse: WAREHOUSES[1], itemCount: 6, totalValue: 104994, orderDate: '2026-08-29', expectedDate: '2026-09-12', status: 'Approved' },
  { id: 'po-7', poNumber: 'PO-2026-0148', supplier: 'Exide Industries', warehouse: WAREHOUSES[3], itemCount: 15, totalValue: 104985, orderDate: '2026-08-30', expectedDate: '2026-09-14', status: 'Draft' },
  { id: 'po-8', poNumber: 'PO-2026-0149', supplier: 'Quick Heal Technologies', warehouse: WAREHOUSES[4], itemCount: 200, totalValue: 259800, orderDate: '2026-08-31', expectedDate: '2026-09-09', status: 'Received' },
]
