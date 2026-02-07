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

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AdminNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/all-slots" element={<AllSlots />} />
        <Route path="/add-slots" element={<AddSlots />} />
        <Route path="/doctor-slots" element={<DoctorSlots />} />
      </Routes>
      </>
  )
}

export default App
