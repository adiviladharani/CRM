import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShippingOutlined'

import PageHeader from '../components/PageHeader'
import Pill, { type PillTone } from '../components/Pill'
import { mockShipments, type ShipmentStatus } from '../data/mockShipments'
import { formatDate } from '../utils/inventory'

const STATUS_TONE: Record<ShipmentStatus, PillTone> = {
  'In Transit': 'info',
  'Out for Delivery': 'warning',
  Delivered: 'success',
  Delayed: 'danger',
}

export default function ShipmentsPage() {
  return (
    <Box className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Shipments"
        subtitle="Inbound shipments from suppliers to your warehouses, with live carrier status."
      />

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Shipment ID</TableCell>
                <TableCell>PO Reference</TableCell>
                <TableCell>Carrier</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Dispatched</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockShipments.map((shipment) => (
                <TableRow key={shipment.id} hover>
                  <TableCell>
                    <Box className="flex items-center gap-2">
                      <LocalShippingIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                        {shipment.shipmentId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.poReference}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{shipment.carrier}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.origin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {shipment.destination}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(shipment.dispatchDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(shipment.eta)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Pill label={shipment.status} tone={STATUS_TONE[shipment.status]} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
