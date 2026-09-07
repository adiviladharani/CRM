import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import ClearIcon from '@mui/icons-material/ClearOutlined'
import IconButton from '@mui/material/IconButton'
import { CATEGORIES } from '../utils/inventory'
import type { StockStatus } from '../types/inventory'

const STATUSES: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock']

interface FiltersBarProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  resultCount: number
  totalCount: number
  onReset: () => void
}

export default function FiltersBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  resultCount,
  totalCount,
  onReset,
}: FiltersBarProps) {
  const hasActiveFilters = search !== '' || category !== 'All' || status !== 'All'

  return (
    <Box className="flex flex-col gap-3">
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <TextField
          size="small"
          placeholder="Search by item name or code…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-72"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onSearchChange('')} edge="end">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />

        <TextField
          select
          size="small"
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full sm:w-56"
        >
          <MenuItem value="All">All Categories</MenuItem>
          {CATEGORIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Stock Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full sm:w-48"
        >
          <MenuItem value="All">All Statuses</MenuItem>
          {STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        {hasActiveFilters && (
          <Button size="small" onClick={onReset} sx={{ color: 'text.secondary', alignSelf: { xs: 'flex-start', sm: 'center' } }}>
            Reset filters
          </Button>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary">
        Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong> items
      </Typography>
    </Box>
  )
}
