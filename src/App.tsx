import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'

const EditPage = lazy(() => import('./pages/EditPage'))

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </Suspense>
    </Router>
  </ThemeProvider>
)

export default App
