import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import AddIcon from '@mui/icons-material/AddOutlined'

import PageHeader from '../components/PageHeader'
import Pill, { type PillTone } from '../components/Pill'
import { mockPurchaseOrders, type PurchaseOrderStatus } from '../data/mockPurchaseOrders'
import { formatCurrency, formatDate } from '../utils/inventory'

const STATUS_TONE: Record<PurchaseOrderStatus, PillTone> = {
  Draft: 'neutral',
  'Pending Approval': 'warning',
  Approved: 'info',
  Received: 'success',
}

export default function PurchaseOrdersPage() {
  const [toastOpen, setToastOpen] = useState(false)

  return (
    <Box className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Purchase Orders"
        subtitle="Track orders raised with suppliers, from draft through delivery to your warehouse."
        action={
          <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={() => setToastOpen(true)} fullWidth>
            Create Purchase Order
          </Button>
        }
      />

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>PO Number</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Order Value</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Expected</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPurchaseOrders.map((po) => (
                <TableRow key={po.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                      {po.poNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{po.supplier}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {po.warehouse}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">{po.itemCount}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrency(po.totalValue)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(po.orderDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(po.expectedDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Pill label={po.status} tone={STATUS_TONE[po.status]} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="info" variant="filled" onClose={() => setToastOpen(false)} sx={{ borderRadius: 2 }}>
          Purchase order creation is a preview in this demo — full CRUD lives on the Inventory page.
        </Alert>
      </Snackbar>
    </Box>
  )
}
