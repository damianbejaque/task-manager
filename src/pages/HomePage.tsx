// src/App.tsx

import { Box } from '@mui/material'
import ListOfTask from '../components/Tasks/TaskList'
import AddTask from '../components/AddTask/AddTask'
import Breadcrumb from '../components/Shared/Breadcrumb'

const Home = () => {
  return (
    <Box
      sx={{
        padding: 4,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 800,
        gap: 3,
      }}
    >
      <Breadcrumb home="Task Management" current="Home" />
      <AddTask />
      <ListOfTask />
    </Box>
  )
}

export default Home
