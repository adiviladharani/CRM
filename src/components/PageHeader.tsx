import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  title: string
  subtitle: string
  action?: React.ReactNode
}

/** Consistent page header used across every module for a uniform enterprise look. */
export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      </Box>
      {action && <Box sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}>{action}</Box>}
    </Box>
  )
}
