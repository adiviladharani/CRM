import { WAREHOUSES } from '../utils/inventory'

export type ShipmentStatus = 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Delayed'

export interface Shipment {
  id: string
  shipmentId: string
  poReference: string
  carrier: string
  origin: string
  destination: string
  dispatchDate: string
  eta: string
  status: ShipmentStatus
}

export const mockShipments: Shipment[] = [
  { id: 'sh-1', shipmentId: 'SHP-88231', poReference: 'PO-2026-0142', carrier: 'Delhivery Logistics', origin: 'Chennai Hub', destination: WAREHOUSES[1], dispatchDate: '2026-08-27', eta: '2026-09-03', status: 'In Transit' },
  { id: 'sh-2', shipmentId: 'SHP-88232', poReference: 'PO-2026-0144', carrier: 'Blue Dart Express', origin: 'Vapi Mill', destination: WAREHOUSES[4], dispatchDate: '2026-08-24', eta: '2026-08-31', status: 'Delivered' },
  { id: 'sh-3', shipmentId: 'SHP-88233', poReference: 'PO-2026-0146', carrier: 'VRL Logistics', origin: 'Mumbai Depot', destination: WAREHOUSES[1], dispatchDate: '2026-08-30', eta: '2026-09-06', status: 'In Transit' },
  { id: 'sh-4', shipmentId: 'SHP-88234', poReference: 'PO-2026-0149', carrier: 'Gati-KWE', origin: 'Pune Plant', destination: WAREHOUSES[4], dispatchDate: '2026-08-31', eta: '2026-09-04', status: 'Out for Delivery' },
  { id: 'sh-5', shipmentId: 'SHP-88235', poReference: 'PO-2026-0143', carrier: 'DTDC Courier', origin: 'Bengaluru Hub', destination: WAREHOUSES[0], dispatchDate: '2026-08-21', eta: '2026-08-28', status: 'Delayed' },
  { id: 'sh-6', shipmentId: 'SHP-88236', poReference: 'PO-2026-0148', carrier: 'Exide Fleet Services', origin: 'Chennai Plant', destination: WAREHOUSES[3], dispatchDate: '2026-08-29', eta: '2026-09-05', status: 'In Transit' },
]
