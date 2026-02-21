import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ForgotPassword from './shared/pages/ForgetPassword'
import PasswordReset from './shared/pages/ResetPassword'
import VerifyAccount from './shared/pages/VerifyAccount'
import VerifyEmail from './shared/pages/VerifyEmail'

// Admin Pages
import AdminLogin from './admin/pages/Login'
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
import BookSlots from './doctor/pages/BookSlots'
import ViewSlots from './doctor/pages/ViewSlots'
import AddSlot from './doctor/pages/AddSlot'
import DoctorNavbar from './doctor/components/Navbar'
import DoctorProtectedRoute from './doctor/components/ProtectedRoute'

// Patient Pages
import PatientLogin from './patient/pages/Login'
import Signup from './patient/pages/Signup'
import Home from './patient/pages/Home'
import DoctorSlot from './patient/pages/DoctorSlot'
import AboutDoctor from './patient/pages/AboutDoctor'
import Appointment from './patient/pages/Appointment'
import Profile from './patient/pages/Profile'
import PatientNavbar from './patient/components/Navbar'
import PatientProtectedRoute from './patient/components/ProtectedRoute'
import { DoctorContextProvider } from './patient/contexts/DoctorContext'
import { DoctorGlobalContextProvider } from './doctor/contexts/DoctorGlobalContext'
import { AdminDoctorContextProvider } from './admin/contexts/AdminDoctorContext'
import {  AdminGlobalContextProvider } from './admin/contexts/AdminGlobalContext'
import { PatientGlobalContextProvider } from './patient/contexts/PatientGlobalContext'
import { PatientContextProvider } from './patient/contexts/PatientContext'

// Role-specific layouts
export function AdminApp() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        {/* Public Auth Routes */}
        <Route path="login" element={<AdminLogin />} />
        
        {/* Protected Routes */}
        <Route path="all-doctors" element={<AdminProtectedRoute><AllDoctors /></AdminProtectedRoute>} />
        <Route path="add-doctor" element={<AdminProtectedRoute><AddDoctor /></AdminProtectedRoute>} />
        <Route path="doctor-info/:id" element={<AdminProtectedRoute><AdminAboutDoctor /></AdminProtectedRoute>} />
        <Route path="edit-doctor/:id" element={<AdminProtectedRoute><EditDoctor /></AdminProtectedRoute>} />
        <Route path="all-slots" element={<AdminProtectedRoute><AllSlots /></AdminProtectedRoute>} />
        <Route path="add-slots" element={<AdminProtectedRoute><AddSlots /></AdminProtectedRoute>} />
        <Route path="doctor-slots" element={<AdminProtectedRoute><DoctorSlots /></AdminProtectedRoute>} />
        
        {/* Catch-all - redirect to all-doctors */}
        <Route path="*" element={<Navigate to="all-doctors" replace />} />
      </Routes>
    </>
  )
}

export function DoctorApp() {
  return (
    <>
      <DoctorNavbar />
      <Routes>
        {/* Public Auth Routes */}
        <Route path="login" element={<DoctorLogin />} />
        
        {/* Protected Routes */}
        <Route path="book-slots" element={<DoctorProtectedRoute><BookSlots /></DoctorProtectedRoute>} />
        <Route path="view-slots" element={<DoctorProtectedRoute><ViewSlots /></DoctorProtectedRoute>} />
        <Route path="add-slot" element={<DoctorProtectedRoute><AddSlot /></DoctorProtectedRoute>} />
        
        {/* Catch-all - redirect to view-slots */}
        <Route path="*" element={<Navigate to="view-slots" replace />} />
      </Routes>
    </>
  )
}

export function PatientApp() {
  return (
    <>
      <PatientNavbar />
      <Routes>
        {/* Public Auth Routes */}
        <Route path="login" element={<PatientLogin />} />
        <Route path="signup" element={<Signup />} />        
        {/* Protected routes */}
        <Route path="all-doctors" element={<PatientProtectedRoute><Home /></PatientProtectedRoute>} />
        <Route path="doctors/:id/slots" element={<PatientProtectedRoute><DoctorSlot /></PatientProtectedRoute>} />
        <Route path="doctors/:id/about" element={<PatientProtectedRoute><AboutDoctor /></PatientProtectedRoute>} />
        <Route path="appointments" element={<PatientProtectedRoute><Appointment /></PatientProtectedRoute>} />
        <Route path="profile" element={<PatientProtectedRoute><Profile /></PatientProtectedRoute>} />
        
        {/* Catch-all - redirect to all-doctors */}
        <Route path="*" element={<Navigate to="all-doctors" replace />} />
      </Routes>
    </>
  )
}

// Main Router
function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}  />
    <Routes>

      {/* Global Auth Routes - These should NOT be redirected */}
      <Route path="/auth/forgot" element={<ForgotPassword />} />
      <Route path="/auth/reset" element={<PasswordReset />} />
      <Route path="/auth/verify-account" element={<VerifyAccount />} />
      <Route path="/auth/verification" element={<VerifyEmail />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <AdminGlobalContextProvider>
          <AdminDoctorContextProvider>
            <AdminApp />
          </AdminDoctorContextProvider> 
        </AdminGlobalContextProvider>
      } />

      {/* Doctor Routes */}
      <Route path="/doctor/*" element={
        <DoctorGlobalContextProvider>
          <DoctorApp />
        </DoctorGlobalContextProvider>
      } />

      {/* Patient Routes */}
      <Route path="/patient/*" element={
        <PatientGlobalContextProvider>
          <PatientContextProvider>
            <DoctorContextProvider>
              <PatientApp />            
            </DoctorContextProvider>
          </PatientContextProvider>
        </PatientGlobalContextProvider>
      } />

      {/* Default - redirect root to patient */}
      <Route path="/" element={<Navigate to="/patient/all-doctors" replace />} />
    </Routes>
    </>
  )
}

export default App
