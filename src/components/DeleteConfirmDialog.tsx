import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverOutlined'
import type { InventoryItem } from '../types/inventory'

interface DeleteConfirmDialogProps {
  item: InventoryItem | null
  onClose: () => void
  onConfirm: (item: InventoryItem) => void
}

export default function DeleteConfirmDialog({ item, onClose, onConfirm }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={!!item} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: 28 }} />
        </Box>
        <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Delete this item?</DialogTitle>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Are you sure you want to delete{' '}
          <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
            "{item?.itemName}"
          </Typography>{' '}
          ({item?.itemCode})? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 1 }}>
        <Button onClick={onClose} color="inherit" fullWidth variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => item && onConfirm(item)}
          color="error"
          fullWidth
          variant="contained"
          disableElevation
        >
          Delete Item
        </Button>
      </DialogActions>
    </Dialog>
  )
}
