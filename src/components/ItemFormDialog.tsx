import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import InventoryIcon from '@mui/icons-material/Inventory2Outlined'
import type { InventoryItem, InventoryItemFormValues } from '../types/inventory'
import { CATEGORIES, WAREHOUSES } from '../utils/inventory'

interface ItemFormDialogProps {
  open: boolean
  mode: 'add' | 'edit'
  initialItem?: InventoryItem | null
  onClose: () => void
  onSubmit: (values: InventoryItemFormValues) => void
}

interface FormState {
  itemName: string
  category: string
  stockQuantity: string
  reorderLevel: string
  unitPrice: string
  warehouse: string
  supplier: string
  description: string
}

const EMPTY_FORM: FormState = {
  itemName: '',
  category: '',
  stockQuantity: '',
  reorderLevel: '',
  unitPrice: '',
  warehouse: '',
  supplier: '',
  description: '',
}

function toFormState(item?: InventoryItem | null): FormState {
  if (!item) return EMPTY_FORM
  return {
    itemName: item.itemName,
    category: item.category,
    stockQuantity: String(item.stockQuantity),
    reorderLevel: String(item.reorderLevel),
    unitPrice: String(item.unitPrice),
    warehouse: item.warehouse,
    supplier: item.supplier,
    description: item.description,
  }
}

type FormErrors = Partial<Record<keyof FormState, string>>

export default function ItemFormDialog({ open, mode, initialItem, onClose, onSubmit }: ItemFormDialogProps) {
  const fullScreen = useMediaQuery('(max-width:600px)')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (open) {
      setForm(toFormState(initialItem))
      setErrors({})
    }
  }, [open, initialItem])

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.itemName.trim()) next.itemName = 'Item name is required'
    if (!form.category) next.category = 'Category is required'
    if (!form.warehouse) next.warehouse = 'Warehouse is required'
    if (!form.supplier.trim()) next.supplier = 'Supplier is required'

    const qty = Number(form.stockQuantity)
    if (form.stockQuantity === '' || Number.isNaN(qty) || qty < 0) next.stockQuantity = 'Enter a valid quantity (0 or more)'

    const reorder = Number(form.reorderLevel)
    if (form.reorderLevel === '' || Number.isNaN(reorder) || reorder < 0) next.reorderLevel = 'Enter a valid reorder level'

    const price = Number(form.unitPrice)
    if (form.unitPrice === '' || Number.isNaN(price) || price <= 0) next.unitPrice = 'Enter a valid unit price'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({
      itemName: form.itemName.trim(),
      category: form.category,
      stockQuantity: Number(form.stockQuantity),
      reorderLevel: Number(form.reorderLevel),
      unitPrice: Number(form.unitPrice),
      warehouse: form.warehouse,
      supplier: form.supplier.trim(),
      description: form.description.trim(),
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={fullScreen}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 6 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            backgroundColor: '#EEF2FF',
            color: '#4F46E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <InventoryIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            {mode === 'add' ? 'Add New Item' : 'Edit Item'}
          </Typography>
          {mode === 'edit' && initialItem && (
            <Typography variant="caption" color="text.secondary">
              {initialItem.itemCode}
            </Typography>
          )}
        </Box>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Item Name"
              value={form.itemName}
              onChange={handleChange('itemName')}
              error={!!errors.itemName}
              helperText={errors.itemName}
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Category"
              value={form.category}
              onChange={handleChange('category')}
              error={!!errors.category}
              helperText={errors.category}
              fullWidth
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Warehouse / Location"
              value={form.warehouse}
              onChange={handleChange('warehouse')}
              error={!!errors.warehouse}
              helperText={errors.warehouse}
              fullWidth
            >
              {WAREHOUSES.map((w) => (
                <MenuItem key={w} value={w}>
                  {w}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Stock Quantity"
              type="number"
              value={form.stockQuantity}
              onChange={handleChange('stockQuantity')}
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity}
              fullWidth
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Reorder Level"
              type="number"
              value={form.reorderLevel}
              onChange={handleChange('reorderLevel')}
              error={!!errors.reorderLevel}
              helperText={errors.reorderLevel || 'Triggers "Low Stock" status'}
              fullWidth
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Unit Price (₹)"
              type="number"
              value={form.unitPrice}
              onChange={handleChange('unitPrice')}
              error={!!errors.unitPrice}
              helperText={errors.unitPrice}
              fullWidth
              slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Supplier"
              value={form.supplier}
              onChange={handleChange('supplier')}
              error={!!errors.supplier}
              helperText={errors.supplier}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Description (optional)"
              value={form.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              minRows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disableElevation>
          {mode === 'add' ? 'Add Item' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
