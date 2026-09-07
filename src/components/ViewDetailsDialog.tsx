import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import type { InventoryItem } from '../types/inventory'
import { formatCurrency, formatDate, getStockStatus } from '../utils/inventory'
import StatusChip from './StatusChip'

interface ViewDetailsDialogProps {
  item: InventoryItem | null
  onClose: () => void
  onEdit: (item: InventoryItem) => void
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.25 }}>
        {value}
      </Typography>
    </Box>
  )
}

export default function ViewDetailsDialog({ item, onClose, onEdit }: ViewDetailsDialogProps) {
  if (!item) return <Dialog open={false} onClose={onClose} />

  const status = getStockStatus(item)
  const stockRatio = item.reorderLevel > 0 ? Math.min((item.stockQuantity / (item.reorderLevel * 2)) * 100, 100) : 100
  const totalValue = item.stockQuantity * item.unitPrice

  return (
    <Dialog open={!!item} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 6 }}>
        <Avatar variant="rounded" sx={{ width: 42, height: 42, bgcolor: '#EEF2FF', color: '#4F46E5', fontWeight: 700 }}>
          {item.itemName.slice(0, 2).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }} noWrap>
            {item.itemName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.itemCode}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Box className="flex items-center justify-between mb-4">
          <StatusChip status={status} />
          <Typography variant="body2" color="text.secondary">
            Last updated {formatDate(item.lastUpdated)}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box className="flex items-center justify-between mb-1">
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              STOCK LEVEL
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.stockQuantity} in stock · reorder at {item.reorderLevel}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stockRatio}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#F1F5F9',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: status === 'Out of Stock' ? '#DC2626' : status === 'Low Stock' ? '#D97706' : '#16A34A',
              },
            }}
          />
        </Box>

        <Box className="grid grid-cols-2 gap-4">
          <Field label="Category" value={item.category} />
          <Field label="Warehouse / Location" value={item.warehouse} />
          <Field label="Unit Price" value={formatCurrency(item.unitPrice)} />
          <Field label="Total Stock Value" value={<strong>{formatCurrency(totalValue)}</strong>} />
          <Field label="Supplier" value={item.supplier} />
          <Field label="Stock Quantity" value={item.stockQuantity.toLocaleString('en-IN')} />
        </Box>

        {item.description && (
          <>
            <Divider sx={{ my: 2.5 }} />
            <Field label="Description" value={item.description} />
          </>
        )}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button
          onClick={() => onEdit(item)}
          variant="contained"
          disableElevation
        >
          Edit Item
        </Button>
      </DialogActions>
    </Dialog>
  )
}
