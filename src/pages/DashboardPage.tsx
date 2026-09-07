import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardOutlined'
import AddIcon from '@mui/icons-material/AddOutlined'

import PageHeader from '../components/PageHeader'
import DashboardCards from '../components/DashboardCards'
import StatusChip from '../components/StatusChip'
import { useInventory } from '../hooks/useInventory'
import { formatCurrency, formatDate, getStockStatus } from '../utils/inventory'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { items, stats } = useInventory()

  const lowStockAlerts = useMemo(
    () =>
      [...items]
        .filter((item) => getStockStatus(item) !== 'In Stock')
        .sort((a, b) => a.stockQuantity - b.stockQuantity)
        .slice(0, 5),
    [items],
  )

  const recentActivity = useMemo(
    () => [...items].sort((a, b) => +new Date(b.lastUpdated) - +new Date(a.lastUpdated)).slice(0, 5),
    [items],
  )

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of items) {
      map.set(item.category, (map.get(item.category) ?? 0) + item.stockQuantity * item.unitPrice)
    }
    const total = [...map.values()].reduce((a, b) => a + b, 0) || 1
    return [...map.entries()]
      .map(([category, value]) => ({ category, value, pct: (value / total) * 100 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  }, [items])

  return (
    <Box className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Dashboard"
        subtitle="An at-a-glance overview of stock health across every warehouse."
        action={
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            onClick={() => navigate('/inventory')}
            fullWidth
          >
            Add New Item
          </Button>
        }
      />

      <Box sx={{ mb: 4 }}>
        <DashboardCards
          totalItems={stats.totalItems}
          lowStock={stats.lowStock}
          outOfStock={stats.outOfStock}
          totalValue={stats.totalValue}
        />
      </Box>

      <Grid container spacing={2.5}>
        {/* Low stock alerts */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ borderRadius: 3, p: 3, height: '100%' }}>
            <Box className="flex items-center justify-between mb-3">
              <Typography variant="subtitle1">Low Stock Alerts</Typography>
              <Button
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                onClick={() => navigate('/inventory')}
              >
                View all
              </Button>
            </Box>
            <Box className="flex flex-col gap-1">
              {lowStockAlerts.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Everything is well stocked — no alerts right now.
                </Typography>
              )}
              {lowStockAlerts.map((item, idx) => (
                <Box key={item.id}>
                  <Box className="flex items-center justify-between gap-3 py-2.5">
                    <Box className="flex items-center gap-3 min-w-0">
                      <Avatar
                        variant="rounded"
                        sx={{ width: 34, height: 34, bgcolor: '#EEF2FF', color: '#4F46E5', fontSize: 13, fontWeight: 700 }}
                      >
                        {item.itemName.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Box className="min-w-0">
                        <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                          {item.itemName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.stockQuantity} left · {item.warehouse}
                        </Typography>
                      </Box>
                    </Box>
                    <StatusChip status={getStockStatus(item)} />
                  </Box>
                  {idx < lowStockAlerts.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recent activity */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ borderRadius: 3, p: 3, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Recent Activity
            </Typography>
            <Box className="flex flex-col gap-1">
              {recentActivity.map((item, idx) => (
                <Box key={item.id}>
                  <Box className="flex items-center justify-between gap-3 py-2.5">
                    <Box className="flex items-center gap-3 min-w-0">
                      <Avatar
                        variant="rounded"
                        sx={{ width: 34, height: 34, bgcolor: '#F0EEF9', color: '#4F46E5', fontSize: 13, fontWeight: 700 }}
                      >
                        {item.itemName.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Box className="min-w-0">
                        <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                          {item.itemName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.itemCode} · {item.category}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                      Updated {formatDate(item.lastUpdated)}
                    </Typography>
                  </Box>
                  {idx < recentActivity.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Category breakdown */}
        <Grid size={12}>
          <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Inventory Value by Category
            </Typography>
            <Box className="flex flex-col gap-3.5">
              {categoryBreakdown.map((row) => (
                <Box key={row.category}>
                  <Box className="flex items-center justify-between mb-1">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatCurrency(row.value)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={row.pct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#F1F5F9',
                      '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: '#4F46E5' },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
