import type { InventoryItem } from '../types/inventory'
import { WAREHOUSES } from '../utils/inventory'

/**
 * Seed data for the Inventory Management demo.
 * Quantities are deliberately spread across In Stock / Low Stock / Out of
 * Stock so the dashboard cards and filters have something to show.
 */
const raw: Array<Omit<InventoryItem, 'id' | 'itemCode'>> = [
  { itemName: 'Wireless Mouse - MX200', category: 'Electronics', stockQuantity: 240, reorderLevel: 50, unitPrice: 799, warehouse: WAREHOUSES[0], supplier: 'Logitech India Pvt Ltd', description: 'Ergonomic 2.4GHz wireless mouse with USB receiver.', lastUpdated: '2026-08-28' },
  { itemName: '27" 4K Monitor', category: 'Electronics', stockQuantity: 18, reorderLevel: 20, unitPrice: 24999, warehouse: WAREHOUSES[1], supplier: 'Dell Technologies', description: 'IPS panel, HDR10, USB-C 65W power delivery.', lastUpdated: '2026-08-30' },
  { itemName: 'Mechanical Keyboard - TKL', category: 'Electronics', stockQuantity: 0, reorderLevel: 25, unitPrice: 3499, warehouse: WAREHOUSES[0], supplier: 'Keychron', description: 'Hot-swappable RGB backlit mechanical keyboard.', lastUpdated: '2026-08-15' },
  { itemName: 'USB-C Docking Station', category: 'Electronics', stockQuantity: 76, reorderLevel: 30, unitPrice: 6499, warehouse: WAREHOUSES[2], supplier: 'Anker Innovations', description: '11-in-1 hub with dual HDMI and 100W PD.', lastUpdated: '2026-08-22' },
  { itemName: 'Laser Printer - LJ2200', category: 'Electronics', stockQuantity: 9, reorderLevel: 10, unitPrice: 15999, warehouse: WAREHOUSES[3], supplier: 'HP India', description: 'Monochrome laser printer, 22 ppm, duplex.', lastUpdated: '2026-08-12' },
  { itemName: 'Office Chair - Ergo Pro', category: 'Furniture', stockQuantity: 54, reorderLevel: 15, unitPrice: 8999, warehouse: WAREHOUSES[1], supplier: 'Featherlite', description: 'Mesh-back ergonomic chair with lumbar support.', lastUpdated: '2026-08-19' },
  { itemName: 'Height-Adjustable Desk', category: 'Furniture', stockQuantity: 12, reorderLevel: 15, unitPrice: 17499, warehouse: WAREHOUSES[1], supplier: 'Godrej Interio', description: 'Electric sit-stand desk, 120x60cm top.', lastUpdated: '2026-08-25' },
  { itemName: '4-Drawer Filing Cabinet', category: 'Furniture', stockQuantity: 0, reorderLevel: 8, unitPrice: 10999, warehouse: WAREHOUSES[2], supplier: 'Godrej Interio', description: 'Lockable steel filing cabinet, letter/legal size.', lastUpdated: '2026-07-30' },
  { itemName: 'Conference Table (10-seater)', category: 'Furniture', stockQuantity: 4, reorderLevel: 3, unitPrice: 45999, warehouse: WAREHOUSES[3], supplier: 'Nilkamal Furniture', description: 'Engineered wood table with cable management.', lastUpdated: '2026-08-10' },
  { itemName: 'A4 Copier Paper (Ream)', category: 'Stationery', stockQuantity: 1200, reorderLevel: 300, unitPrice: 249, warehouse: WAREHOUSES[4], supplier: 'JK Paper Ltd', description: '75 GSM, 500 sheets per ream.', lastUpdated: '2026-08-31' },
  { itemName: 'Gel Pens (Box of 10)', category: 'Stationery', stockQuantity: 340, reorderLevel: 100, unitPrice: 120, warehouse: WAREHOUSES[4], supplier: 'Cello Pens', description: 'Smooth-write 0.5mm gel pens, assorted colors.', lastUpdated: '2026-08-27' },
  { itemName: 'Sticky Notes Pack', category: 'Stationery', stockQuantity: 22, reorderLevel: 60, unitPrice: 85, warehouse: WAREHOUSES[0], supplier: '3M India', description: '76x76mm, 6 pads x 100 sheets, neon colors.', lastUpdated: '2026-08-20' },
  { itemName: 'Whiteboard Markers (Set of 4)', category: 'Stationery', stockQuantity: 0, reorderLevel: 40, unitPrice: 199, warehouse: WAREHOUSES[2], supplier: 'Camlin Kokuyo', description: 'Low-odor dry-erase markers, bullet tip.', lastUpdated: '2026-08-05' },
  { itemName: 'Corporate Polo T-Shirt (L)', category: 'Apparel', stockQuantity: 88, reorderLevel: 40, unitPrice: 549, warehouse: WAREHOUSES[1], supplier: 'Reliance Trends B2B', description: 'Cotton-blend polo with embroidered logo.', lastUpdated: '2026-08-14' },
  { itemName: 'Safety Vest - Hi Vis', category: 'Apparel', stockQuantity: 15, reorderLevel: 25, unitPrice: 399, warehouse: WAREHOUSES[3], supplier: '3M India', description: 'ANSI Class 2 reflective safety vest.', lastUpdated: '2026-08-09' },
  { itemName: 'Winter Jacket - Fleece', category: 'Apparel', stockQuantity: 0, reorderLevel: 20, unitPrice: 1299, warehouse: WAREHOUSES[5], supplier: 'Wildcraft', description: 'Warehouse staff fleece-lined jacket, navy.', lastUpdated: '2026-07-22' },
  { itemName: 'Basmati Rice (25kg Bag)', category: 'Groceries & FMCG', stockQuantity: 460, reorderLevel: 100, unitPrice: 2450, warehouse: WAREHOUSES[5], supplier: 'India Gate Foods', description: 'Premium long-grain aged basmati rice.', lastUpdated: '2026-08-29' },
  { itemName: 'Cooking Oil (15L Tin)', category: 'Groceries & FMCG', stockQuantity: 30, reorderLevel: 50, unitPrice: 2150, warehouse: WAREHOUSES[5], supplier: 'Adani Wilmar', description: 'Refined sunflower oil, catering pack.', lastUpdated: '2026-08-18' },
  { itemName: 'Green Tea (100 Bags)', category: 'Groceries & FMCG', stockQuantity: 6, reorderLevel: 30, unitPrice: 320, warehouse: WAREHOUSES[4], supplier: 'Tata Consumer Products', description: 'Pantry-stock green tea bags for office use.', lastUpdated: '2026-08-24' },
  { itemName: 'Cordless Drill Machine', category: 'Hardware & Tools', stockQuantity: 27, reorderLevel: 10, unitPrice: 4999, warehouse: WAREHOUSES[0], supplier: 'Bosch Power Tools', description: '18V lithium-ion cordless drill with 2 batteries.', lastUpdated: '2026-08-21' },
  { itemName: 'Hex Key Set (Metric)', category: 'Hardware & Tools', stockQuantity: 150, reorderLevel: 50, unitPrice: 349, warehouse: WAREHOUSES[2], supplier: 'Taparia Tools', description: '9-piece chrome vanadium hex key set.', lastUpdated: '2026-08-16' },
  { itemName: 'Industrial Extension Cord (20m)', category: 'Hardware & Tools', stockQuantity: 3, reorderLevel: 15, unitPrice: 1899, warehouse: WAREHOUSES[3], supplier: 'Havells India', description: 'Heavy-duty 15A extension reel with MCB.', lastUpdated: '2026-08-07' },
  { itemName: 'Corrugated Boxes (Medium)', category: 'Packaging', stockQuantity: 2200, reorderLevel: 500, unitPrice: 28, warehouse: WAREHOUSES[1], supplier: 'ITC Packaging', description: '3-ply corrugated shipping cartons, 30x30x30cm.', lastUpdated: '2026-08-30' },
  { itemName: 'Bubble Wrap Roll (50m)', category: 'Packaging', stockQuantity: 40, reorderLevel: 20, unitPrice: 899, warehouse: WAREHOUSES[1], supplier: 'Supreme Industries', description: 'Anti-static bubble wrap for fragile items.', lastUpdated: '2026-08-13' },
  { itemName: 'Packing Tape (48mm x 65m)', category: 'Packaging', stockQuantity: 0, reorderLevel: 100, unitPrice: 55, warehouse: WAREHOUSES[2], supplier: '3M India', description: 'Clear BOPP packing tape, industrial grade.', lastUpdated: '2026-07-28' },
  { itemName: 'Antivirus Suite - 1yr License', category: 'Software & Licenses', stockQuantity: 500, reorderLevel: 100, unitPrice: 1299, warehouse: WAREHOUSES[4], supplier: 'Quick Heal Technologies', description: 'Single-seat endpoint protection license key.', lastUpdated: '2026-08-26' },
  { itemName: 'Office Suite - Business License', category: 'Software & Licenses', stockQuantity: 12, reorderLevel: 15, unitPrice: 8999, warehouse: WAREHOUSES[4], supplier: 'Microsoft India', description: 'Annual productivity suite license, per user.', lastUpdated: '2026-08-23' },
  { itemName: 'Badminton Racket - Pro Series', category: 'Sports Equipment', stockQuantity: 34, reorderLevel: 12, unitPrice: 2499, warehouse: WAREHOUSES[0], supplier: 'Yonex India', description: 'Graphite frame racket for recreational play.', lastUpdated: '2026-08-11' },
  { itemName: 'Yoga Mats (6mm)', category: 'Sports Equipment', stockQuantity: 0, reorderLevel: 20, unitPrice: 799, warehouse: WAREHOUSES[5], supplier: 'Decathlon Sports', description: 'Non-slip TPE yoga mat for wellness room.', lastUpdated: '2026-07-19' },
  { itemName: 'Car Battery - 65Ah', category: 'Automotive Parts', stockQuantity: 21, reorderLevel: 10, unitPrice: 6999, warehouse: WAREHOUSES[3], supplier: 'Exide Industries', description: 'Maintenance-free sealed lead-acid battery.', lastUpdated: '2026-08-17' },
  { itemName: 'Engine Oil (5L Can)', category: 'Automotive Parts', stockQuantity: 58, reorderLevel: 25, unitPrice: 2299, warehouse: WAREHOUSES[3], supplier: 'Castrol India', description: 'Fully synthetic 5W-30 engine oil.', lastUpdated: '2026-08-28' },
  { itemName: 'Alloy Wheel Cover Set', category: 'Automotive Parts', stockQuantity: 5, reorderLevel: 12, unitPrice: 3499, warehouse: WAREHOUSES[3], supplier: 'MRF Limited', description: 'Set of 4 universal-fit wheel covers, 15-inch.', lastUpdated: '2026-08-04' },
  { itemName: 'Barcode Scanner - Handheld', category: 'Electronics', stockQuantity: 41, reorderLevel: 15, unitPrice: 3299, warehouse: WAREHOUSES[2], supplier: 'Honeywell Scanning', description: 'Wireless 2D barcode scanner with cradle.', lastUpdated: '2026-08-29' },
  { itemName: 'Thermal Label Rolls (100mm)', category: 'Packaging', stockQuantity: 96, reorderLevel: 40, unitPrice: 310, warehouse: WAREHOUSES[2], supplier: 'TSC Auto ID', description: 'Direct thermal shipping label rolls, 500/roll.', lastUpdated: '2026-08-20' },
  { itemName: 'Standing Fan - 18 inch', category: 'Electronics', stockQuantity: 13, reorderLevel: 12, unitPrice: 2799, warehouse: WAREHOUSES[5], supplier: 'Havells India', description: 'High-speed pedestal fan for warehouse floor.', lastUpdated: '2026-08-06' },
  { itemName: 'Fire Extinguisher - 4kg CO2', category: 'Hardware & Tools', stockQuantity: 19, reorderLevel: 10, unitPrice: 3199, warehouse: WAREHOUSES[0], supplier: 'Safex Fire Services', description: 'ISI-marked CO2 fire extinguisher, wall-mounted.', lastUpdated: '2026-08-15' },
  { itemName: 'Pallet Wrap Film', category: 'Packaging', stockQuantity: 0, reorderLevel: 60, unitPrice: 640, warehouse: WAREHOUSES[1], supplier: 'Supreme Industries', description: 'Stretch wrap film for pallet stabilization.', lastUpdated: '2026-07-25' },
  { itemName: 'Noise-Cancelling Headset', category: 'Electronics', stockQuantity: 62, reorderLevel: 25, unitPrice: 5499, warehouse: WAREHOUSES[0], supplier: 'Jabra India', description: 'Bluetooth ANC headset for support desks.', lastUpdated: '2026-08-27' },
  { itemName: 'Visitor Badge Printer', category: 'Electronics', stockQuantity: 7, reorderLevel: 8, unitPrice: 12999, warehouse: WAREHOUSES[4], supplier: 'Evolis India', description: 'Single-sided ID card printer, USB.', lastUpdated: '2026-08-02' },
  { itemName: 'Stackable Storage Bins', category: 'Furniture', stockQuantity: 210, reorderLevel: 80, unitPrice: 449, warehouse: WAREHOUSES[5], supplier: 'Nilkamal Furniture', description: 'Heavy-duty plastic bins for small parts storage.', lastUpdated: '2026-08-31' },
]

export const mockInventory: InventoryItem[] = raw.map((item, index) => ({
  id: `seed-${index + 1}`,
  itemCode: `ITM-${String(index + 1).padStart(4, '0')}`,
  ...item,
}))
