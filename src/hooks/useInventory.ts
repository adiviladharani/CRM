import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { InventoryItem, InventoryItemFormValues, NotificationState } from '../types/inventory'
import { mockInventory } from '../data/mockInventory'
import {
  createInventoryItem,
  deleteInventoryItem,
  fetchInventoryItems,
  updateInventoryItem,
} from '../api/inventoryApi'
import { inventoryKeys } from '../api/queryKeys'

/**
 * Data layer for inventory items, now backed by TanStack Query instead of
 * plain useState + useEffect.
 *
 * - Reading: `useQuery` fetches the list through `fetchInventoryItems` and
 *   caches it under `inventoryKeys.items()`. Every page that calls this
 *   hook shares that one cache entry, so there's a single in-memory source
 *   of truth for the currently mounted page (localStorage remains the
 *   persisted source of truth underneath, unchanged from before).
 * - Writing: `useMutation` wraps add/update/delete. Each mutation's
 *   `onSuccess` invalidates `inventoryKeys.items()`, which tells any
 *   mounted `useQuery` for that key to refetch — so the table, dashboard
 *   cards and reports all stay in sync automatically after a change.
 *
 * The public return shape (`items`, `addItem`, `updateItem`, `deleteItem`,
 * `stats`, `notification`, `notify`, `closeNotification`) is unchanged, so
 * every page that already consumes `useInventory()` keeps working exactly
 * as before with no changes required.
 */
export function useInventory() {
  const queryClient = useQueryClient()
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'success',
  })

  const notify = useCallback((message: string, severity: NotificationState['severity'] = 'success') => {
    setNotification({ open: true, message, severity })
  }, [])

  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }))
  }, [])

  // `staleTime: Infinity` because localStorage is the single source of
  // truth here (there's no server that could change data behind our back);
  // every mutation explicitly invalidates this key instead of relying on
  // background refetches, so the UI never shows stale data.
  const { data: items = mockInventory } = useQuery({
    queryKey: inventoryKeys.items(),
    queryFn: fetchInventoryItems,
    staleTime: Infinity,
  })

  const invalidateItems = useCallback(
    () => queryClient.invalidateQueries({ queryKey: inventoryKeys.items() }),
    [queryClient],
  )

  const addMutation = useMutation({
    mutationFn: createInventoryItem,
    onSuccess: async (newItem) => {
      await invalidateItems()
      notify(`"${newItem.itemName}" was added to inventory.`, 'success')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: InventoryItemFormValues }) =>
      updateInventoryItem(id, values),
    onSuccess: async (updatedItem) => {
      await invalidateItems()
      notify(`"${updatedItem.itemName}" was updated successfully.`, 'success')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (item: InventoryItem) => deleteInventoryItem(item.id),
    onSuccess: async (_deletedId, item) => {
      await invalidateItems()
      notify(`"${item.itemName}" was deleted from inventory.`, 'info')
    },
  })

  const addItem = useCallback(
    (values: InventoryItemFormValues) => {
      addMutation.mutate(values)
    },
    [addMutation],
  )

  const updateItem = useCallback(
    (id: string, values: InventoryItemFormValues) => {
      updateMutation.mutate({ id, values })
    },
    [updateMutation],
  )

  const deleteItem = useCallback(
    (id: string) => {
      const target = items.find((item) => item.id === id)
      if (target) deleteMutation.mutate(target)
    },
    [items, deleteMutation],
  )

  const stats = useMemo(() => {
    const totalItems = items.length
    let lowStock = 0
    let outOfStock = 0
    let totalValue = 0
    for (const item of items) {
      totalValue += item.stockQuantity * item.unitPrice
      if (item.stockQuantity <= 0) outOfStock += 1
      else if (item.stockQuantity <= item.reorderLevel) lowStock += 1
    }
    return { totalItems, lowStock, outOfStock, totalValue }
  }, [items])

  return { items, addItem, updateItem, deleteItem, stats, notification, notify, closeNotification }
}
