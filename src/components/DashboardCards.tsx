import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Inventory2Icon from '@mui/icons-material/Inventory2Outlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmberOutlined'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCartOutlined'
import PaymentsIcon from '@mui/icons-material/PaymentsOutlined'
import { formatCurrency } from '../utils/inventory'

interface DashboardCardsProps {
  totalItems: number
  lowStock: number
  outOfStock: number
  totalValue: number
}

interface CardConfig {
  label: string
  value: string
  icon: React.ReactElement
  iconColor: string
  iconBg: string
  helper: string
}

export default function DashboardCards({ totalItems, lowStock, outOfStock, totalValue }: DashboardCardsProps) {
  const cards: CardConfig[] = [
    {
      label: 'Total Items',
      value: totalItems.toLocaleString('en-IN'),
      icon: <Inventory2Icon sx={{ fontSize: 26 }} />,
      iconColor: '#4F46E5',
      iconBg: '#EEF2FF',
      helper: 'Active SKUs tracked',
    },
    {
      label: 'Low Stock Items',
      value: lowStock.toLocaleString('en-IN'),
      icon: <WarningAmberIcon sx={{ fontSize: 26 }} />,
      iconColor: '#D97706',
      iconBg: '#FEF3C7',
      helper: 'At or below reorder level',
    },
    {
      label: 'Out of Stock Items',
      value: outOfStock.toLocaleString('en-IN'),
      icon: <RemoveShoppingCartIcon sx={{ fontSize: 26 }} />,
      iconColor: '#DC2626',
      iconBg: '#FEE2E2',
      helper: 'Needs immediate restock',
    },
    {
      label: 'Total Inventory Value',
      value: formatCurrency(totalValue),
      icon: <PaymentsIcon sx={{ fontSize: 26 }} />,
      iconColor: '#16A34A',
      iconBg: '#DCFCE7',
      helper: 'Stock quantity × unit price',
    },
  ]

  return (
    <Grid container spacing={2.5}>
      {cards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {card.label}
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {card.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: card.iconBg,
                  color: card.iconColor,
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
              {card.helper}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
