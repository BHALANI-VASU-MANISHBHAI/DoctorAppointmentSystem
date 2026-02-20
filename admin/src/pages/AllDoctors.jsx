import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../contexts/DoctorContext.jsx";
import { useEffect } from "react";

function AllDoctors() {
  const navigate = useNavigate();

  const [doctors , setDoctors] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");


  const fetchDoctors = async () => {
    try {
      const response = await API.admin.getAllDoctors();
      console.log("Fetched doctors from context:", response);
      // Extract doctors array from response
      const doctorsArray = Array.isArray(response) ? response : response.doctors || [];
      setDoctors(doctorsArray);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };  

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );






  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              All Doctors
            </h1>
            <p className="text-gray-600 mt-2">Manage all registered doctors in the system</p>
          </div>
          <button
            onClick={() => navigate("/add-doctor")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-600 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Doctor
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
            />
          </div>
        </div>

      
        {/* Empty State */}
        { doctors.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Doctors Found</h3>
              <p className="text-gray-600">No doctors registered in the system yet</p>
            </div>
          </div>
        )}

        {/* No Search Results */}
        { doctors.length > 0 && filteredDoctors.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        { filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-blue-700 hover:scale-105 transform transition-all duration-300"
              >
                <div className="p-6">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    {doctor.profilePictureUrl ? (
                      <img 
                        src={doctor.profilePictureUrl} 
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-blue-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                        {doctor.name?.charAt(0) || "D"}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-1">
                    {doctor.name || "Doctor"}
                  </h3>

                  {/* Email */}
                  <p className="text-sm text-gray-600 text-center mb-4 break-all">
                    {doctor.email}
                  </p>

                  {/* Specialization Badge */}
                  <div className="flex justify-center mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                      {doctor.specialization || "General"}
                    </span>
                  </div>

                  {/* Bio */}
                  {doctor.bio && (
                    <p className="text-xs text-gray-600 text-center mb-4 line-clamp-2 italic">
                      "{doctor.bio}"
                    </p>
                  )}

                  {/* Experience */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 text-center">
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {doctor.experience || 0}
                    </p>
                    <p className="text-xs text-gray-600">
                      {doctor.experience === 1 ? "year" : "years"}
                    </p>
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center justify-center gap-2 mb-5">
                    {doctor.emailVerified ? (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 rounded-lg border border-emerald-200">
                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-emerald-700">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 rounded-lg border border-amber-200">
                        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-amber-700">Unverified</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1   gap-3">
                    <button 
                      onClick={() => navigate(`/doctor-info/${doctor.id}`, { state: { doctor } })}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        { doctors.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>
              Showing <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{doctors.length}</span> doctors
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllDoctors;
