import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// pages
import HomePage from './pages'
import Dashboard from './pages/dashboard'


// routes
const router = createBrowserRouter([
  { path: "/", element: <HomePage />, index: true },
  { path: "/dashboard", element: <Dashboard /> },

])
function App() {
  return (
    <main className='App'>
      {/* import header */}
      {/* Routes */}
      <RouterProvider router={router} />
    </main>
  )
}

export default App
