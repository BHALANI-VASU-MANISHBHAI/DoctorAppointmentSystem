import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Admin Pages
import AdminLogin from './admin/pages/Login'
import AdminResetPassword from './admin/pages/ResetPassword'
import AllDoctors from './admin/pages/AllDoctors'
import AddDoctor from './admin/pages/AddDoctor'
import AllSlots from './admin/pages/AllSlots'
import AddSlots from './admin/pages/AddSlots'
import DoctorSlots from './admin/pages/DoctorSlots'
import AdminAboutDoctor from './admin/pages/AdminAboutDoctor'
import EditDoctor from './admin/pages/EditDoctor'
import AdminNavbar from './admin/components/AdminNavbar'
import AdminProtectedRoute from './admin/components/ProtectedRoute'

// Doctor Pages
import DoctorLogin from './doctor/pages/Login'
import DoctorResetPassword from './doctor/pages/ResetPassword'
import BookSlots from './doctor/pages/BookSlots'
import ViewSlots from './doctor/pages/ViewSlots'
import AddSlot from './doctor/pages/AddSlot'
import DoctorNavbar from './doctor/components/Navbar'
import DoctorProtectedRoute from './doctor/components/ProtectedRoute'

// Patient Pages
import PatientLogin from './patient/pages/Login'
import Signup from './patient/pages/Signup'
import VerifyAccount from './patient/pages/VerifyAccount'
import PatientResetPassword from './patient/pages/ResetPassword'
import Home from './patient/pages/Home'
import DoctorSlot from './patient/pages/DoctorSlot'
import AboutDoctor from './patient/pages/AboutDoctor'
import Appointment from './patient/pages/Appointment'
import Profile from './patient/pages/Profile'
import PatientNavbar from './patient/components/Navbar'
import PatientProtectedRoute from './patient/components/ProtectedRoute'

// Role-specific layouts
function AdminApp() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AdminNavbar />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/reset-password" element={<AdminResetPassword />} />
        <Route path="/all-doctors" element={<AdminProtectedRoute><AllDoctors /></AdminProtectedRoute>} />
        <Route path="/add-doctor" element={<AdminProtectedRoute><AddDoctor /></AdminProtectedRoute>} />
        <Route path="/doctor-info/:id" element={<AdminProtectedRoute><AdminAboutDoctor /></AdminProtectedRoute>} />
        <Route path="/edit-doctor/:id" element={<AdminProtectedRoute><EditDoctor /></AdminProtectedRoute>} />
        <Route path="/all-slots" element={<AdminProtectedRoute><AllSlots /></AdminProtectedRoute>} />
        <Route path="/add-slots" element={<AdminProtectedRoute><AddSlots /></AdminProtectedRoute>} />
        <Route path="/doctor-slots" element={<AdminProtectedRoute><DoctorSlots /></AdminProtectedRoute>} />
        <Route path="*" element={<Navigate to="/admin/all-doctors" replace />} />
      </Routes>
    </>
  )
}

function DoctorApp() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <DoctorNavbar />
      <Routes>
        <Route path="/login" element={<DoctorLogin />} />
        <Route path="/reset-password" element={<DoctorResetPassword />} />
        <Route path="/book-slots" element={<DoctorProtectedRoute><BookSlots /></DoctorProtectedRoute>} />
        <Route path="/view-slots" element={<DoctorProtectedRoute><ViewSlots /></DoctorProtectedRoute>} />
        <Route path="/add-slot" element={<DoctorProtectedRoute><AddSlot /></DoctorProtectedRoute>} />
        <Route path="*" element={<Navigate to="/doctor/view-slots" replace />} />
      </Routes>
    </>
  )
}

function PatientApp() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <PatientNavbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PatientLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/reset-password" element={<PatientResetPassword />} />

        {/* Protected routes */}
        <Route path="/" element={<PatientProtectedRoute><Home /></PatientProtectedRoute>} />
        <Route path="/doctor/:id/slots" element={<PatientProtectedRoute><DoctorSlot /></PatientProtectedRoute>} />
        <Route path="/doctor/:id/about" element={<PatientProtectedRoute><AboutDoctor /></PatientProtectedRoute>} />
        <Route path="/appointments" element={<PatientProtectedRoute><Appointment /></PatientProtectedRoute>} />
        <Route path="/profile" element={<PatientProtectedRoute><Profile /></PatientProtectedRoute>} />
      </Routes>
    </>
  )
}

// Main Router
function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Doctor Routes */}
      <Route path="/doctor/*" element={<DoctorApp />} />

      {/* Patient Routes (default) */}
      <Route path="/*" element={<PatientApp />} />
    </Routes>
  )
}

export default App
