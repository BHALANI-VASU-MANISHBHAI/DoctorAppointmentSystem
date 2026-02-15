import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyAccount from './pages/VerifyAccount'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import DoctorSlot from './pages/DoctorSlot'
import AboutDoctor from './pages/AboutDoctor'
import Appointment from './pages/Appointment'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/:id/slots"
          element={
            <ProtectedRoute>
              <DoctorSlot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/:id/about"
          element={
            <ProtectedRoute>
              <AboutDoctor />
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
