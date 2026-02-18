import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from "../../shared/api/index.js";
const AboutDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);


  const getDoctorDetails = async () => {
    try {
      setLoading(true);
      const response = await API.patient.getSpecificDoctor(id);
      setDoctor(response);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, [id]);




  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Doctor information not found.</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Go Back
            </button>
          </div>  
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {doctor.profilePictureUrl ? (
                <img 
                  src={doctor.profilePictureUrl} 
                  alt={doctor.name}
                  className="w-40 h-40 rounded-2xl object-cover shadow-lg border-4 border-blue-100"
                />
              ) : (
                <div className="w-40 h-40 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                  {doctor.name?.charAt(0) || "D"}
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                 {doctor.name || "Doctor"}
              </h1>
              
              {doctor.specialization && (
                <p className="text-xl text-blue-600 font-semibold mb-4">
                  {doctor.specialization}
                </p>
              )}

              {doctor.email && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {doctor.email}
                </div>
              )}

              {doctor.experience && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {doctor.experience} years of experience
                </div>
              )}

              <button
                onClick={() => navigate(`/doctors/${doctor.id}/slots`)}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {doctor.bio && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{doctor.bio}</p>
          </div>
        )}

        {/* Qualifications Section */}
        {doctor.degrees && doctor.degrees.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Qualifications</h2>
            <div className="space-y-4">
              {doctor.degrees.map((degree, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{degree.degreeName}</h3>
                      <p className="text-gray-600 mt-1">{degree.field}</p>
                      <p className="text-sm text-gray-500 mt-2">{degree.university}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                      {degree.yearCompleted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specialization Details */}
        {doctor.specialization && (
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialization</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">Specializes in</p>
                <p className="text-xl font-bold text-gray-900">{doctor.specialization}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutDoctor;