import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import LinearProgress from '@mui/material/LinearProgress'
import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined'

import PageHeader from '../components/PageHeader'
import StatusChip from '../components/StatusChip'
import { useInventory } from '../hooks/useInventory'
import { formatCurrency, getStockStatus } from '../utils/inventory'

function downloadCsv(rows: string[][], filename: string) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function ReportsPage() {
  const { items } = useInventory()

  const statusBreakdown = useMemo(() => {
    const counts = { 'In Stock': 0, 'Low Stock': 0, 'Out of Stock': 0 }
    for (const item of items) counts[getStockStatus(item)] += 1
    const total = items.length || 1
    return (Object.keys(counts) as Array<keyof typeof counts>).map((status) => ({
      status,
      count: counts[status],
      pct: (counts[status] / total) * 100,
    }))
  }, [items])

  const valuableItems = useMemo(
    () => [...items].sort((a, b) => b.stockQuantity * b.unitPrice - a.stockQuantity * a.unitPrice).slice(0, 8),
    [items],
  )

  const handleExport = () => {
    const header = ['Item Code', 'Item Name', 'Category', 'Stock Qty', 'Unit Price', 'Warehouse', 'Status']
    const rows = items.map((item) => [
      item.itemCode,
      item.itemName,
      item.category,
      String(item.stockQuantity),
      String(item.unitPrice),
      item.warehouse,
      getStockStatus(item),
    ])
    downloadCsv([header, ...rows], `inventory-report-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <Box className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Reports"
        subtitle="Stock health and valuation summaries across the current inventory."
        action={
          <Button variant="contained" disableElevation startIcon={<FileDownloadIcon />} onClick={handleExport} fullWidth>
            Export Inventory CSV
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ borderRadius: 3, p: 3, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Stock Status Distribution
            </Typography>
            <Box className="flex flex-col gap-4">
              {statusBreakdown.map((row) => (
                <Box key={row.status}>
                  <Box className="flex items-center justify-between mb-1.5">
                    <StatusChip status={row.status} />
                    <Typography variant="body2" color="text.secondary">
                      {row.count} items
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={row.pct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#F1F5F9',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundColor:
                          row.status === 'Out of Stock' ? '#DC2626' : row.status === 'Low Stock' ? '#D97706' : '#16A34A',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Typography variant="subtitle1">Highest-Value Stock</Typography>
            </Box>
            <TableContainer sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Stock Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {valuableItems.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.itemName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.itemCode}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{item.stockQuantity.toLocaleString('en-IN')}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatCurrency(item.stockQuantity * item.unitPrice)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
