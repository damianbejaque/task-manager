import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

import { Button, Card, TextField, Typography, Box } from '@mui/material'
import { TaskStatus, useTaskStore } from '../../reducers/taskReducers'

const Add: React.FC = () => {
  const { title, description, tasks, setTitle, setDescription, addTask } =
    useTaskStore()
  const [error, setError] = useState({ title: false, description: false })

  const handleAddTask = () => {
    setError({ title: false, description: false })

    const isTitleValid = title.trim().length > 0
    const isDescriptionValid = description.trim().length > 0

    if (!isTitleValid || !isDescriptionValid) {
      setError({
        title: !isTitleValid,
        description: !isDescriptionValid,
      })
      return
    }

    const newTaskId =
      tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0
    addTask({
      id: newTaskId,
      title,
      description,
      history: [{ status: TaskStatus.Todo, timestamp: new Date() }],
    })

    setTitle('')
    setDescription('')
  }

  return (
    <Card
      sx={{
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}
      >
        <InsertDriveFileIcon sx={{ color: 'text.secondary' }} />
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
          }}
        >
          Add a new Task
        </Typography>
      </Box>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
        error={error.title}
        helperText={error.title ? 'Title is required' : ''}
        sx={{
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '28px',
            '& fieldset': {
              borderColor: 'grey.300',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
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
        error={error.description}
        helperText={error.description ? 'Description is required' : ''}
        sx={{
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '28px',
            '& fieldset': {
              borderColor: 'grey.300',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: '28px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Card>
  )
}

export default Add
