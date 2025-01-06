import { Box, Card, Typography, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import Task from './Task'
import DefaultModal from '../Modal/DefaultModal'
import { useNavigate } from 'react-router-dom'
import { useTaskStore } from '../../reducers/taskReducers'

const ListOfTask = () => {
  const navigate = useNavigate()
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
      >
        {selectedTask !== null &&
          tasks
            .find(task => task.id === selectedTask)
            ?.history.map(entry => (
              <Box key={entry.timestamp.toString()} sx={{ marginBottom: 2 }}>
                <Typography>The task was marked as "{entry.status}"</Typography>
                <Typography variant="caption">
                  {entry.timestamp.toString()}
                </Typography>
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

export default ListOfTask
