import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTaskStore } from '../reducers/taskReducers'
import EditTask from '../components/EditTask/EditTask'

const EditPage: React.FC = () => {
  const { tasks, selectedTask } = useTaskStore()
  const task = tasks.find(task => task.id === selectedTask)
  if (!task) return <Typography variant="h6">Task not found</Typography>

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 500,
        margin: 'auto',
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <EditTask />
    </Box>
  )
}

export default EditPage
