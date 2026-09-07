import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/AddOutlined'

import PageHeader from '../components/PageHeader'
import DashboardCards from '../components/DashboardCards'
import FiltersBar from '../components/FiltersBar'
import InventoryTable, { type SortKey } from '../components/InventoryTable'
import ItemFormDialog from '../components/ItemFormDialog'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import ViewDetailsDialog from '../components/ViewDetailsDialog'

import { useInventory } from '../hooks/useInventory'
import { getStockStatus } from '../utils/inventory'
import type { InventoryItem } from '../types/inventory'

export default function InventoryPage() {
  const { items, addItem, updateItem, deleteItem, stats, notification, closeNotification } = useInventory()

  // Filters
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>('itemName')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Dialog state
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add')
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [viewingItem, setViewingItem] = useState<InventoryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null)

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    let result = items.filter((item) => {
      const matchesSearch =
        q === '' || item.itemName.toLowerCase().includes(q) || item.itemCode.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || item.category === category
      const matchesStatus = status === 'All' || getStockStatus(item) === status
      return matchesSearch && matchesCategory && matchesStatus
    })

    result = [...result].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })

    return result
  }, [items, search, category, status, sortKey, sortDir])

  const paginatedItems = useMemo(() => {
    const start = page * rowsPerPage
    return filteredItems.slice(start, start + rowsPerPage)
  }, [filteredItems, page, rowsPerPage])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
    setStatus('All')
    setPage(0)
  }

  const openAddDialog = () => {
    setFormMode('add')
    setEditingItem(null)
    setFormOpen(true)
  }

  const openEditDialog = (item: InventoryItem) => {
    setFormMode('edit')
    setEditingItem(item)
    setViewingItem(null)
    setFormOpen(true)
  }

  const handleFormSubmit = (values: Parameters<typeof addItem>[0]) => {
    if (formMode === 'add') {
      addItem(values)
    } else if (editingItem) {
      updateItem(editingItem.id, values)
    }
    setFormOpen(false)
  }

  const handleConfirmDelete = (item: InventoryItem) => {
    deleteItem(item.id)
    setDeletingItem(null)
  }

  return (
    <Box className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Inventory Management"
        subtitle="Track stock levels, manage items, and monitor warehouse inventory in real time."
        action={
          <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={openAddDialog} fullWidth>
            Add New Item
          </Button>
        }
      />

      {/* Dashboard cards */}
      <Box sx={{ mb: 4 }}>
        <DashboardCards
          totalItems={stats.totalItems}
          lowStock={stats.lowStock}
          outOfStock={stats.outOfStock}
          totalValue={stats.totalValue}
        />
      </Box>

      {/* Inventory list */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <FiltersBar
            search={search}
            onSearchChange={(v) => {
              setSearch(v)
              setPage(0)
            }}
            category={category}
            onCategoryChange={(v) => {
              setCategory(v)
              setPage(0)
            }}
            status={status}
            onStatusChange={(v) => {
              setStatus(v)
              setPage(0)
            }}
            resultCount={filteredItems.length}
            totalCount={items.length}
            onReset={resetFilters}
          />
        </Box>
        <Divider />

        <InventoryTable
          items={paginatedItems}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          onView={(item) => setViewingItem(item)}
          onEdit={openEditDialog}
          onDelete={(item) => setDeletingItem(item)}
        />

        {filteredItems.length > 0 && (
          <>
            <Divider />
            <TablePagination
              component="div"
              count={filteredItems.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10))
                setPage(0)
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </>
        )}
      </Paper>

      {/* Dialogs */}
      <ItemFormDialog
        open={formOpen}
        mode={formMode}
        initialItem={editingItem}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
      <ViewDetailsDialog item={viewingItem} onClose={() => setViewingItem(null)} onEdit={openEditDialog} />
      <DeleteConfirmDialog item={deletingItem} onClose={() => setDeletingItem(null)} onConfirm={handleConfirmDelete} />

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3500}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeNotification} severity={notification.severity} variant="filled" sx={{ borderRadius: 2 }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
