import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import Inventory2Icon from '@mui/icons-material/Inventory2Outlined'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined'
import LocalShippingIcon from '@mui/icons-material/LocalShippingOutlined'
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNoneOutlined'
import WarehouseIcon from '@mui/icons-material/WarehouseOutlined'
import { getInitials, useSettings } from '../context/SettingsContext'

const DRAWER_WIDTH = 252

interface NavItem {
  label: string
  path: string
  icon: React.ReactElement
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Inventory', path: '/inventory', icon: <Inventory2Icon fontSize="small" /> },
  { label: 'Purchase Orders', path: '/purchase-orders', icon: <ReceiptLongIcon fontSize="small" /> },
  { label: 'Shipments', path: '/shipments', icon: <LocalShippingIcon fontSize="small" /> },
  { label: 'Reports', path: '/reports', icon: <AssessmentIcon fontSize="small" /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon fontSize="small" /> },
]

function isNavItemActive(pathname: string, itemPath: string) {
  if (itemPath === '/') return pathname === '/'
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()

  return (
    <Box className="flex h-full flex-col">
      <Box className="flex items-center gap-2 px-5 py-5">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            backgroundColor: '#4F46E5',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WarehouseIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.1 }}>
            StockPilot
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Inventory Suite
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {NAV_ITEMS.map((navItem) => {
          const active = isNavItemActive(pathname, navItem.path)
          return (
            <ListItemButton
              key={navItem.path}
              component={RouterLink}
              to={navItem.path}
              onClick={onNavigate}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active ? 'primary.main' : 'text.secondary',
                backgroundColor: active ? '#EEF2FF' : 'transparent',
                '&.Mui-selected': { backgroundColor: '#EEF2FF' },
                '&.Mui-selected:hover': { backgroundColor: '#E0E7FF' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{navItem.icon}</ListItemIcon>
              <ListItemText
                primary={navItem.label}
                slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: active ? 700 : 500 } } }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Box className="rounded-2xl bg-indigo-50 p-4">
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#4338CA' }}>
            Need help?
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Check our warehouse operations guide for best practices.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { settings } = useSettings()

  const currentLabel = NAV_ITEMS.find((item) => isNavItemActive(pathname, item.path))?.label ?? 'StockPilot'

  return (
    <Box className="flex min-h-screen">
      {/* Desktop sidebar */}
      <Box
        component="nav"
        className="hidden lg:block"
        sx={{ width: DRAWER_WIDTH, flexShrink: 0, borderRight: '1px solid #E2E8F0', backgroundColor: '#fff' }}
      >
        <Box sx={{ position: 'sticky', top: 0, height: '100vh' }}>
          <SidebarContent />
        </Box>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', lg: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <Box className="flex min-w-0 flex-1 flex-col">
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ backgroundColor: '#fff', color: 'text.primary', borderBottom: '1px solid #E2E8F0' }}
        >
          <Toolbar className="gap-2">
            <IconButton onClick={() => setMobileOpen(true)} className="lg:!hidden" edge="start">
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              {currentLabel}
            </Typography>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge color="error" variant="dot">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={`${settings.name} · ${settings.role}`}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: '#4F46E5', fontSize: 14, fontWeight: 700, ml: 0.5 }}>
                {getInitials(settings.name)}
              </Avatar>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Box component="main" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </Box>
      </Box>
    </Box>
  )
}
