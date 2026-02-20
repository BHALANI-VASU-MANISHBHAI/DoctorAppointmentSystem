import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminAPI } from "../api/adminAPI.js";

const AdminAboutDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchDoctor() {
    try {
      setLoading(true);
      const response = await adminAPI.getSpecificDoctor(id);
      setDoctor(response);
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDoctor();
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
          onClick={() => navigate("/all-doctors")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="shrink-0">
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
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {doctor.email}
                </div>
              )}

              {doctor.experience && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {doctor.experience} years of experience
                </div>
              )}

              {/* Verification Status */}
              <div className="mt-6 flex items-center gap-3">
                {doctor.emailVerified ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">Email Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg border border-amber-200">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">Email Not Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {doctor.bio && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {doctor.bio}
            </p>
          </div>
        )}

        {/* Education & Qualifications */}
        {doctor.degrees && doctor.degrees.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Education & Qualifications
            </h2>
            <div className="space-y-4">
              {doctor.degrees.map((degree, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-6 py-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {degree.degreeName}
                      </h3>
                      <p className="text-gray-600 mt-1">{degree.field}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {degree.university}
                      </p>
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

        {/* Admin Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Admin Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/edit-doctor/${id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Update Profile
            </button>
            <button
              onClick={() =>
                navigate(`/doctor-slots`, { state: { doctorId: doctor.id } })
              }
              className="flex-1 flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              View Doctor Slots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutDoctor;
