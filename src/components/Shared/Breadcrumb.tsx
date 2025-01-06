import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface BreadcrumbProps {
  home: string
  current: string
  onReturn?: () => void
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ home, current, onReturn }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ marginBottom: 2 }}
    >
      <Link
        underline="hover"
        color="inherit"
        onClick={onReturn ? onReturn : () => {}}
        sx={{ fontWeight: 'bold' }}
      >
        {home}
      </Link>
      <Typography color="text.secondary">{current}</Typography>
    </Breadcrumbs>
  )
}

export default Breadcrumb
