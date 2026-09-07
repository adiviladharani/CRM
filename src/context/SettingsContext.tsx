import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'inventory-mgmt:settings:v1'

export interface AppSettings {
  name: string
  email: string
  role: string
  lowStockAlerts: boolean
  outOfStockAlerts: boolean
  weeklyDigest: boolean
  currency: string
  timezone: string
}

export const DEFAULT_SETTINGS: AppSettings = {
  name: 'Mamatha Jala',
  email: 'mamatha.jala@idstech.ai',
  role: 'Inventory Manager',
  lowStockAlerts: true,
  outOfStockAlerts: true,
  weeklyDigest: false,
  currency: 'INR (₹)',
  timezone: 'Asia/Kolkata (IST, UTC+5:30)',
}

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
  } catch {
    // ignore, fall back to defaults
  }
  return DEFAULT_SETTINGS
}

/** Turns "Preethi Sharma" into "PS", falling back gracefully for single names. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  return parts
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface SettingsContextValue {
  settings: AppSettings
  /** Persists the given settings app-wide (localStorage + every consumer, e.g. the header avatar). */
  saveSettings: (next: AppSettings) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(loadSettings)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // storage may be unavailable (private mode, quota) — safe to ignore for this demo
    }
  }, [settings])

  const saveSettings = useCallback((next: AppSettings) => {
    setSettings(next)
  }, [])

  const value = useMemo(() => ({ settings, saveSettings }), [settings, saveSettings])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
