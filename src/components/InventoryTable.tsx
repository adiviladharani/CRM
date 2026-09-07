import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import Inventory2Icon from '@mui/icons-material/Inventory2Outlined'
import PlaceIcon from '@mui/icons-material/PlaceOutlined'
import type { InventoryItem } from '../types/inventory'
import { formatCurrency, getStockStatus } from '../utils/inventory'
import StatusChip from './StatusChip'

export type SortKey = 'itemName' | 'category' | 'stockQuantity' | 'unitPrice' | 'warehouse'

interface InventoryTableProps {
  items: InventoryItem[]
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onSort: (key: SortKey) => void
  onView: (item: InventoryItem) => void
  onEdit: (item: InventoryItem) => void
  onDelete: (item: InventoryItem) => void
}

const columns: { key: SortKey; label: string; align?: 'right' | 'left' }[] = [
  { key: 'itemName', label: 'Item' },
  { key: 'category', label: 'Category' },
  { key: 'stockQuantity', label: 'Stock Qty', align: 'right' },
  { key: 'unitPrice', label: 'Unit Price', align: 'right' },
  { key: 'warehouse', label: 'Warehouse / Location' },
]

function EmptyState() {
  return (
    <Box className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          backgroundColor: '#EEF2FF',
          color: '#4F46E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Inventory2Icon sx={{ fontSize: 28 }} />
      </Box>
      <Typography variant="subtitle1">No items found</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Try adjusting your search or filters, or add a new item to get started.
      </Typography>
    </Box>
  )
}

export default function InventoryTable({ items, sortKey, sortDir, onSort, onView, onEdit, onDelete }: InventoryTableProps) {
  if (items.length === 0) return <EmptyState />

  return (
    <>
      {/* Desktop / tablet table */}
      <TableContainer className="hidden md:block">
        <Table size="medium">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align ?? 'left'}>
                  <TableSortLabel
                    active={sortKey === col.key}
                    direction={sortKey === col.key ? sortDir : 'asc'}
                    onClick={() => onSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const status = getStockStatus(item)
              return (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar
                        variant="rounded"
                        sx={{ width: 38, height: 38, bgcolor: '#EEF2FF', color: '#4F46E5', fontSize: 14, fontWeight: 700 }}
                      >
                        {item.itemName.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.itemName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.itemCode}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.category}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.stockQuantity.toLocaleString('en-IN')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      reorder at {item.reorderLevel}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">{formatCurrency(item.unitPrice)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box className="flex items-center gap-1">
                      <PlaceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">{item.warehouse}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={status} />
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex items-center justify-end gap-0.5">
                      <Tooltip title="View details">
                        <IconButton size="small" onClick={() => onView(item)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit item">
                        <IconButton size="small" onClick={() => onEdit(item)} sx={{ color: 'primary.main' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete item">
                        <IconButton size="small" onClick={() => onDelete(item)} sx={{ color: 'error.main' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile card list */}
      <Box className="md:hidden flex flex-col gap-3 p-3">
        {items.map((item) => {
          const status = getStockStatus(item)
          return (
            <Box
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Box className="flex items-start justify-between gap-2">
                <Box className="flex items-center gap-3 min-w-0">
                  <Avatar
                    variant="rounded"
                    sx={{ width: 40, height: 40, bgcolor: '#EEF2FF', color: '#4F46E5', fontSize: 14, fontWeight: 700, flexShrink: 0 }}
                  >
                    {item.itemName.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Box className="min-w-0">
                    <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
                      {item.itemName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.itemCode} · {item.category}
                    </Typography>
                  </Box>
                </Box>
                <StatusChip status={status} />
              </Box>

              <Box className="mt-3 grid grid-cols-2 gap-2">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Stock Qty
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.stockQuantity.toLocaleString('en-IN')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Unit Price
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(item.unitPrice)}
                  </Typography>
                </Box>
                <Box className="col-span-2">
                  <Typography variant="caption" color="text.secondary">
                    Warehouse / Location
                  </Typography>
                  <Typography variant="body2">{item.warehouse}</Typography>
                </Box>
              </Box>

              <Box className="mt-3 flex items-center justify-end gap-1 border-t border-slate-100 pt-2">
                <Tooltip title="View details">
                  <IconButton size="small" onClick={() => onView(item)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit item">
                  <IconButton size="small" onClick={() => onEdit(item)} sx={{ color: 'primary.main' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete item">
                  <IconButton size="small" onClick={() => onDelete(item)} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
