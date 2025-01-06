import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { TaskInterface } from '../../reducers/taskReducers'
import { formattedDate } from '../utils/date'

interface TaskProps {
  task: TaskInterface
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

const TaskItem: React.FC<TaskProps> = React.memo(({ task, onMenuOpen }) => {
  const theme = useTheme()
  const status = task.history.slice(-1)[0].status

  const date = formattedDate(task.history.slice(-1)[0].timestamp)

  return (
    <Card
      key={task.id}
      sx={{ marginBottom: 2, borderBottom: '1px solid #000' }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ maxWidth: '80%' }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {task.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: theme.palette.text.secondary,
            }}
          >
            <AccessTimeIcon fontSize="small" />
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Created: {date}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.secondary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.description}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={status.toUpperCase()}
            sx={{
              backgroundColor:
                status === 'In Progress'
                  ? theme.palette.secondary.light
                  : status === 'Done'
                    ? theme.palette.warning.light
                    : theme.palette.success.light,
              color:
                status === 'In Progress'
                  ? theme.palette.info.main
                  : status === 'Done'
                    ? theme.palette.warning.main
                    : theme.palette.success.main,
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
          <IconButton onClick={event => onMenuOpen(event, task.id)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
})

export default TaskItem
