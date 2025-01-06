import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { Box } from '@mui/material'

const EditPage = lazy(() => import('./pages/EditPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/task-manager">
        <Suspense fallback={<div>Loading...</div>}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<EditPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
