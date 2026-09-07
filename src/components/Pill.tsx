import Chip from '@mui/material/Chip'

export type PillTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const TONES: Record<PillTone, { color: string; bg: string }> = {
  success: { color: '#15803D', bg: '#DCFCE7' },
  warning: { color: '#B45309', bg: '#FEF3C7' },
  danger: { color: '#B91C1C', bg: '#FEE2E2' },
  info: { color: '#3730A3', bg: '#E0E7FF' },
  neutral: { color: '#475569', bg: '#F1F5F9' },
}

interface PillProps {
  label: string
  tone: PillTone
  icon?: React.ReactElement
}

/** Generic status pill used across secondary modules (Purchase Orders, Shipments). */
export default function Pill({ label, tone, icon }: PillProps) {
  const cfg = TONES[tone]
  return (
    <Chip
      icon={icon}
      label={label}
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
