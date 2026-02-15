import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import BookSlots from './pages/BookSlots'
import ViewSlots from './pages/ViewSlots'
import AddSlot from './pages/AddSlot'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/book-slots"
          element={
            <ProtectedRoute>
              <BookSlots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-slots"
          element={
            <ProtectedRoute>
              <ViewSlots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-slot"
          element={
            <ProtectedRoute>
              <AddSlot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
