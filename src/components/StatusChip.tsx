import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined'
import WarningIcon from '@mui/icons-material/WarningOutlined'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import type { StockStatus } from '../types/inventory'

const CONFIG: Record<StockStatus, { color: string; bg: string; icon: React.ReactElement }> = {
  'In Stock': { color: '#15803D', bg: '#DCFCE7', icon: <CheckCircleIcon sx={{ fontSize: 16 }} /> },
  'Low Stock': { color: '#B45309', bg: '#FEF3C7', icon: <WarningIcon sx={{ fontSize: 16 }} /> },
  'Out of Stock': { color: '#B91C1C', bg: '#FEE2E2', icon: <CancelIcon sx={{ fontSize: 16 }} /> },
}

export default function StatusChip({ status }: { status: StockStatus }) {
  const cfg = CONFIG[status]
  return (
    <Chip
      icon={cfg.icon}
      label={status}
      size="small"
      sx={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        '& .MuiChip-icon': { color: cfg.color },
        fontWeight: 700,
        fontSize: '0.72rem',
      }}
    />
  )
}
