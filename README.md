# StockPilot — Inventory Management

A modern, responsive Inventory Management page with full CRUD (Create, Read, Update, Delete), search & filtering, dashboard summary cards, and pagination — built as a professional enterprise-SaaS UI (in the spirit of Dynamics 365 / Salesforce / Zoho Inventory).

## Tech stack

- **React 19** + **TypeScript**
- **React Router v7** (client-side routing between the six pages)
- **Vite** (build tool / dev server)
- **Tailwind CSS v4** (layout & responsive utility classes)
- **Material UI (MUI) v9** (components: dialogs, tables, form controls, snackbars, outlined icons)
- HTML5 / CSS3

## Features

- **Six working pages**, all reachable from the sidebar (every nav link routes to a real page — nothing is a dead link):
  - **Dashboard** — KPI cards, a Low Stock Alerts list, Recent Activity, and an inventory-value-by-category breakdown.
  - **Inventory** — the full CRUD module described below.
  - **Purchase Orders** — a supplier order tracker (PO number, supplier, value, dates, status).
  - **Shipments** — inbound shipment tracking with carrier and ETA.
  - **Reports** — stock status distribution, highest-value stock, and a real "Export Inventory CSV" download.
  - **Settings** — profile, notification preferences, and regional (currency/timezone) settings, persisted locally.
- **Dashboard cards**: Total Items, Low Stock Items, Out of Stock Items, Total Inventory Value (auto-calculated).
- **Inventory table**: Item Code, Item Name, Category, Stock Quantity, Unit Price, Warehouse/Location, Status — sortable columns, collapses to a card list on mobile.
- **Search & filters**: search by item name/code, filter by category and stock status, with a live "showing X of Y" count and one-click reset.
- **Full CRUD** (Inventory page):
  - **Add New Item** — validated form dialog (auto-generates the next item code).
  - **Edit Item** — pre-filled form dialog.
  - **Delete Item** — confirmation dialog before removal.
  - **View Details** — read-only dialog with a stock-level indicator and full item info.
- **Notifications**: success/info snackbar toasts for add/update/delete actions, inline validation errors on the form.
- **Pagination**: configurable rows-per-page (5/10/25/50).
- **Responsive design**: desktop sidebar navigation + data table; mobile hamburger drawer + stacked card list; full-screen dialogs on small screens.
- **Status logic**: status (`In Stock` / `Low Stock` / `Out of Stock`) is derived automatically from `stockQuantity` vs. `reorderLevel` — no manual toggling needed.
- **Local persistence**: inventory edits and settings are saved to `localStorage` so they survive a page refresh (seeded with 40 realistic demo items across 10 categories and 6 warehouses).
- **Professional, outlined icon set**: every icon in the app uses Material UI's `Outlined` variants for a lighter, enterprise-SaaS look (in the spirit of Dynamics 365 / Salesforce) rather than filled/rounded icons.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint       # lint the project
```

## Project structure

```
src/
  components/         # Shared UI building blocks (app shell/sidebar, dashboard cards, table,
                       # dialogs, filters, page header, status pills)
  pages/               # One component per route: Dashboard, Inventory, Purchase Orders,
                       # Shipments, Reports, Settings
  data/                # Seed/mock data (inventory, purchase orders, shipments)
  hooks/               # useInventory — CRUD logic, derived stats, notifications, localStorage sync
  theme/               # MUI theme (colors, typography, component overrides)
  types/               # Shared TypeScript types
  utils/               # Formatting helpers, status logic, category/warehouse lists
  App.tsx              # Route table (react-router-dom) wrapped in the app shell
  main.tsx             # App entry point (ThemeProvider, CssBaseline, BrowserRouter)
```

## Connecting to a real backend

This project ships with mock data and client-side state (`src/hooks/useInventory.ts`) so it's ready to explore out of the box. To wire it up to a real API:

1. Replace the seed data in `src/data/mockInventory.ts` with an API fetch (e.g. in a `useEffect` inside `useInventory.ts`, or migrate to a data-fetching library like TanStack Query).
2. Swap `addItem` / `updateItem` / `deleteItem` in `useInventory.ts` for calls to your REST/GraphQL endpoints, keeping the same function signatures so no component code needs to change.
3. Remove or adapt the `localStorage` persistence effect once your backend is the source of truth.

## Customization

- **Brand colors / typography** — edit `src/theme/theme.ts`.
- **Categories / warehouses** — edit the `CATEGORIES` and `WAREHOUSES` arrays in `src/utils/inventory.ts`.
- **Currency / locale** — `formatCurrency` in `src/utils/inventory.ts` uses `Intl.NumberFormat('en-IN', { currency: 'INR' })`; change the locale/currency code as needed.
