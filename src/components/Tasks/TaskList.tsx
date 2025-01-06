import { Box, Card, Typography, Menu, MenuItem, useTheme } from '@mui/material'
import { useState } from 'react'
import Task from './TaskItem'
import DefaultModal from '../Shared/DefaultModal'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useNavigate } from 'react-router-dom'
import { useTaskStore } from '../../reducers/taskReducers'
import { formattedDate } from '../utils/date'

const TaskList = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { tasks, selectedTask, setSelectedTask, deleteTask } = useTaskStore()

  // Dialog States
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    setMenuAnchor(event.currentTarget)
    setSelectedTask(id)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleOpenHistory = () => {
    setIsHistoryDialogOpen(true)
    handleMenuClose()
  }

  const handleOpenDelete = () => {
    setIsDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleIsHistoryDialogClose = () => {
    setIsHistoryDialogOpen(false)
    setSelectedTask(null)
  }

  const handleIsDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
    setSelectedTask(null)
  }

  const handleDeleteTask = () => {
    if (selectedTask !== null) {
      deleteTask(selectedTask)
    }
    handleIsDeleteDialogClose()
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Card sx={{ padding: 4, textAlign: 'center' }}>
          <Typography>You have nothing to do.</Typography>
          <Typography>Go get some sleep!</Typography>
        </Card>
      ) : (
        tasks.map(task => (
          <Task
            task={task}
            key={task.id}
            onMenuOpen={event => handleMenuOpen(event, task.id)}
          />
        ))
      )}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenHistory}>Task History</MenuItem>
        <MenuItem onClick={() => navigate('/edit')}>Edit Task</MenuItem>
        <MenuItem onClick={handleOpenDelete}>Delete Task</MenuItem>
      </Menu>

      <DefaultModal
        isOpen={isHistoryDialogOpen}
        onClose={handleIsHistoryDialogClose}
        sx={{ borderRadius: '28px', minWidth: '800px' }}
      >
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
          Task History
        </Typography>

        {selectedTask !== null &&
          tasks
            .find(task => task.id === selectedTask)
            ?.history.map(entry => (
              <Box key={entry.timestamp.toString()} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">
                  The task was marked as "{entry.status}"
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
                    Created: {formattedDate(entry.timestamp)}
                  </Typography>
                </Box>
              </Box>
            ))}
      </DefaultModal>

      <DefaultModal
        isOpen={isDeleteDialogOpen}
        onClose={handleIsDeleteDialogClose}
        title="Delete Task"
        onConfirm={handleDeleteTask}
        dialog={`You have made changes, are you sure about deleting "${tasks.find(
          task => task.id === selectedTask,
        )?.title}"?`}
        confirmText="Delete"
      />
    </Box>
  )
}

export default TaskList
