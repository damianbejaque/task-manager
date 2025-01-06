import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TaskStatus, useTaskStore } from '../../reducers/taskReducers'
import Breadcrumb from '../Shared/Breadcrumb'

const EditTask = () => {
  const navigate = useNavigate()

  const { tasks, selectedTask, editTask, setSelectedTask } = useTaskStore()
  const task = tasks.find(task => task.id === selectedTask)

  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState<TaskStatus>(
    task?.history.slice(-1)[0].status || TaskStatus.Todo,
  )

  const handleSave = () => {
    if (!task) return

    editTask({
      ...task,
      title,
      description,
      history: [
        ...task.history,
        { status: status as TaskStatus, timestamp: new Date() },
      ],
    })
    navigate('/')
  }

  const handleCancel = () => {
    setSelectedTask(null)
    navigate('/')
  }

  if (!task) return <Typography variant="h6">Task not found</Typography>

  return (
    <>
      <Breadcrumb
        home="Task Management"
        current="Edit"
        onReturn={handleCancel}
      />

      <Typography variant="h6" gutterBottom>
        Edit Task
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
        >
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </>
  )
}
export default EditTask
