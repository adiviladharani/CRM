import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import SaveIcon from '@mui/icons-material/SaveOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActiveOutlined'
import PublicIcon from '@mui/icons-material/PublicOutlined'

import PageHeader from '../components/PageHeader'
import { getInitials, useSettings, type AppSettings } from '../context/SettingsContext'

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactElement
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Paper sx={{ borderRadius: 3, p: 3 }}>
      <Box className="flex items-start gap-3 mb-4">
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            backgroundColor: '#EEF2FF',
            color: '#4F46E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {children}
    </Paper>
  )
}

export default function SettingsPage() {
  // `settings` is the committed, app-wide value (drives the header avatar too).
  // `draft` is this form's local working copy, so edits don't apply until Save.
  const { settings, saveSettings } = useSettings()
  const [draft, setDraft] = useState<AppSettings>(settings)
  const [savedOpen, setSavedOpen] = useState(false)

  const set = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    saveSettings(draft)
    setSavedOpen(true)
  }

  return (
    <Box className="mx-auto max-w-[900px]">
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, alert preferences, and regional formatting."
        action={
          <Button variant="contained" disableElevation startIcon={<SaveIcon />} onClick={handleSave} fullWidth>
            Save Changes
          </Button>
        }
      />

      <Box className="flex flex-col gap-3">
        <SectionCard icon={<PersonIcon fontSize="small" />} title="Profile" description="Your account details as they appear across StockPilot.">
          <Box className="flex items-center gap-3 mb-4">
            <Avatar sx={{ width: 56, height: 56, bgcolor: '#4F46E5', fontSize: 20, fontWeight: 700 }}>
              {getInitials(draft.name)}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {draft.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {draft.role}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Full Name" value={draft.name} onChange={(e) => set('name', e.target.value)} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email Address" value={draft.email} onChange={(e) => set('email', e.target.value)} fullWidth />
            </Grid>
            <Grid size={12}>
              <TextField label="Role" value={draft.role} onChange={(e) => set('role', e.target.value)} fullWidth />
            </Grid>
          </Grid>
        </SectionCard>

        <SectionCard
          icon={<NotificationsActiveIcon fontSize="small" />}
          title="Notification Preferences"
          description="Choose which inventory events should notify you."
        >
          <Box className="flex flex-col gap-1">
            <FormControlLabel
              control={<Switch checked={draft.lowStockAlerts} onChange={(e) => set('lowStockAlerts', e.target.checked)} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Low stock alerts
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Notify me when an item reaches its reorder level
                  </Typography>
                </Box>
              }
              sx={{ py: 1, alignItems: 'flex-start', ml: 0 }}
            />
            <Divider />
            <FormControlLabel
              control={<Switch checked={draft.outOfStockAlerts} onChange={(e) => set('outOfStockAlerts', e.target.checked)} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Out of stock alerts
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Notify me immediately when an item runs out
                  </Typography>
                </Box>
              }
              sx={{ py: 1, alignItems: 'flex-start', ml: 0 }}
            />
            <Divider />
            <FormControlLabel
              control={<Switch checked={draft.weeklyDigest} onChange={(e) => set('weeklyDigest', e.target.checked)} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Weekly summary email
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    A digest of stock movement and valuation, every Monday
                  </Typography>
                </Box>
              }
              sx={{ py: 1, alignItems: 'flex-start', ml: 0 }}
            />
          </Box>
        </SectionCard>

        <SectionCard icon={<PublicIcon fontSize="small" />} title="Regional Format" description="Currency and timezone used across reports and dates.">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select label="Currency" value={draft.currency} onChange={(e) => set('currency', e.target.value)} fullWidth>
                <MenuItem value="INR (₹)">INR (₹) — Indian Rupee</MenuItem>
                <MenuItem value="USD ($)">USD ($) — US Dollar</MenuItem>
                <MenuItem value="EUR (€)">EUR (€) — Euro</MenuItem>
                <MenuItem value="GBP (£)">GBP (£) — British Pound</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select label="Timezone" value={draft.timezone} onChange={(e) => set('timezone', e.target.value)} fullWidth>
                <MenuItem value="Asia/Kolkata (IST, UTC+5:30)">Asia/Kolkata (IST, UTC+5:30)</MenuItem>
                <MenuItem value="Asia/Dubai (GST, UTC+4:00)">Asia/Dubai (GST, UTC+4:00)</MenuItem>
                <MenuItem value="Europe/London (GMT, UTC+0:00)">Europe/London (GMT, UTC+0:00)</MenuItem>
                <MenuItem value="America/New_York (EST, UTC-5:00)">America/New_York (EST, UTC-5:00)</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </SectionCard>
      </Box>

      <Snackbar open={savedOpen} autoHideDuration={3000} onClose={() => setSavedOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSavedOpen(false)} sx={{ borderRadius: 2 }}>
          Settings saved successfully.
        </Alert>
      </Snackbar>
    </Box>
  )
}
