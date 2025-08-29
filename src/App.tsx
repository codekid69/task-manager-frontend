import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useAuthStore } from './store/auth'
import { useThemeStore } from './store/theme'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { TasksPage } from './pages/TasksPage'
import { NewTaskPage } from './pages/NewTaskPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { isAuthenticated } = useAuthStore()
  const { resolvedTheme, setTheme } = useThemeStore()

  useEffect(() => {
    // Apply theme on initial load
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedTheme)
    
    // Initialize theme from storage
    const stored = localStorage.getItem('theme-storage')
    if (stored) {
      const { state } = JSON.parse(stored)
      if (state?.theme) {
        setTheme(state.theme)
      }
    }
  }, [resolvedTheme, setTheme])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/tasks" replace /> : <Login />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? <Navigate to="/tasks" replace /> : <Register />
              } 
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/tasks" replace />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="tasks/new" element={<NewTaskPage />} />
              <Route path="tasks/:id" element={<div>Task Detail (Coming Soon)</div>} />
              <Route 
                path="admin/users" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <div>User Management (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin/stats" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <div>Statistics (Coming Soon)</div>
                  </ProtectedRoute>
                } 
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster 
            position="top-right"
            theme={resolvedTheme}
            richColors
          />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App