import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PatientGlobalContext } from "../contexts/PatientGlobalContext";

function Navbar() {
  const { token, setToken } = useContext(PatientGlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show navbar on auth pages
  if (["/patient/login", "/patient/signup", "/patient/verify"].includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    setToken(null);
    navigate("/patient/login");
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            
            <span className="font-bold text-xl bg-blue-500 bg-clip-text text-transparent">
              MediBook
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/patient/all-doctors"
              className={`font-medium transition-colors ${
                location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/patient/appointments"
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname === "/patient/appointments"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              My Appointments
            </Link>
            <Link
              to="/patient/profile"
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname === "/patient/profile"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>
          </div>

          {/* Mobile Menu + Logout */}
          <div className="flex items-center gap-4">
            {/* Mobile Links */}
            <div className="md:hidden flex items-center gap-4">
              <Link
                to="/patient/appointments"
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === "/patient/appointments"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title="My Appointments"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link
                to="/patient/profile"
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === "/patient/profile"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title="My Profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all duration-200 border border-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
