/**
 * Central place for TanStack Query cache keys.
 *
 * Every `useQuery`/`useMutation` call that touches inventory data uses the
 * same key from here, which is what lets the cache be shared: the
 * Dashboard, Inventory and Reports pages each call `useInventory()`
 * independently, but because they all query `inventoryKeys.items()` they
 * read from (and invalidate) the exact same cached list.
 */
export const inventoryKeys = {
  all: ['inventory'] as const,
  items: () => [...inventoryKeys.all, 'items'] as const,
}
