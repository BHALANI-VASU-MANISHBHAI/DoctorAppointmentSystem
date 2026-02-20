import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show navbar on auth pages
  if (["/doctor/login", "/doctor/reset-password"].includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    console.log("Token removed from localStorage");
    navigate("/doctor/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/doctor/book-slots")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              DocPortal
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/doctor/book-slots")}
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname === "/doctor/book-slots" ? "text-teal-600" : "text-gray-700 hover:text-teal-600"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Booked Appointments
            </button>
            <button
              onClick={() => navigate("/doctor/view-slots")}
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname === "/doctor/view-slots" ? "text-teal-600" : "text-gray-700 hover:text-teal-600"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              My Slots
            </button>
            <button
              onClick={() => navigate("/doctor/add-slot")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === "/doctor/add-slot"
                  ? "bg-teal-100 text-teal-600"
                  : "bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Slot
            </button>
          </div>

          {/* Mobile Menu + Logout */}
          <div className="flex items-center gap-4">
            {/* Mobile Links */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => navigate("/doctor/book-slots")}
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === "/doctor/book-slots"
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title="Booked Appointments"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <button
                onClick={() => navigate("/doctor/view-slots")}
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === "/doctor/view-slots"
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title="My Slots"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => navigate("/doctor/add-slot")}
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === "/doctor/add-slot"
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title="Add Slot"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
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
