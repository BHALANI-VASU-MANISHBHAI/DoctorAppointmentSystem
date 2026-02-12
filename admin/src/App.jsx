  import './App.css'
  import { Route, Routes } from 'react-router-dom'
  import Login from './pages/Login'
  import ResetPassword from './pages/ResetPassword'
import AllDoctors from './pages/AllDoctors'
import AddDoctor from './pages/AddDoctor'
import AllSlots from './pages/AllSlots'
import AddSlots from './pages/AddSlots'
import DoctorSlots from './pages/DoctorSlots'
import AdminNavbar from './components/AdminNavbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute'
 
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AdminNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/all-doctors" element={<ProtectedRoute><AllDoctors /></ProtectedRoute>} />
        <Route path="/add-doctor" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
        <Route path="/all-slots" element={<ProtectedRoute><AllSlots /></ProtectedRoute>} />
        <Route path="/add-slots" element={<ProtectedRoute><AddSlots /></ProtectedRoute>} />
        <Route path="/doctor-slots" element={<ProtectedRoute><DoctorSlots /></ProtectedRoute>} />
      </Routes>
      </>
  )
}

export default App
