import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../shared/api/index.js";
import { AdminDoctorContext } from "../contexts/AdminDoctorContext.jsx";
const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, setDoctors } = useContext(AdminDoctorContext);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [updating, setUpdating] = useState(false);

  async function fetchDoctor() {
    try {
      setLoading(true);
      const response = await API.admin.getSpecificDoctor(id);
      setDoctor(response.data);
      setEditData({
        name: response.data.name,
        email: response.data.email,
        specialization: response.data.specialization,
        experience: response.data.experience || 0,
        bio: response.data.bio || "",
        degrees: response.data.degrees || [
          {
            degreeName: "",
            field: "",
            university: "",
            yearCompleted: new Date().getFullYear(),
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "experience" ? parseInt(value) || 0 : value,
    }));
  };

  const handleDegreeChange = (index, field, value) => {
    const updatedDegrees = [...editData.degrees];
    updatedDegrees[index] = {
      ...updatedDegrees[index],
      [field]:
        field === "yearCompleted"
          ? parseInt(value) || new Date().getFullYear()
          : value,
    };
    setEditData((prev) => ({
      ...prev,
      degrees: updatedDegrees,
    }));
  };

  const addDegree = () => {
    setEditData((prev) => ({
      ...prev,
      degrees: [
        ...prev.degrees,
        {
          degreeName: "",
          field: "",
          university: "",
          yearCompleted: new Date().getFullYear(),
        },
      ],
    }));
  };

  const removeDegree = (index) => {
    setEditData((prev) => ({
      ...prev,
      degrees: prev.degrees.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      if (!editData.name.trim()) {
        toast.error("Doctor name is required");
        return;
      }
      if (!editData.email.trim()) {
        toast.error("Email is required");
        return;
      }
      if (!editData.specialization.trim()) {
        toast.error("Specialization is required");
        return;
      }
      const updateData = {
        name: editData.name,
        email: editData.email,
        specialization: editData.specialization,
        experience: editData.experience,
        bio: editData.bio,
        degrees: editData.degrees.filter(
          (d) => d.degreeName && d.field && d.university,
        ),
      };

      setUpdating(true);

      await adminAPI.updateDoctor(updateData);

      // Update local state
      const updatedDoctor = {
        ...doctor,
        name: editData.name,
        email: editData.email,
        specialization: editData.specialization,
        experience: editData.experience,
        bio: editData.bio,
        degrees: editData.degrees,
      };
      setDoctor(updatedDoctor);

      // Update context
      setDoctors(
        doctors.map((d) => (d.id.toString() === id.toString() ? updatedDoctor : d))
      );

      toast.success("Doctor profile updated successfully");
      navigate(`/admin/doctor-info/${id}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUpdating(false);
    }
  };

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
          onClick={() => navigate(`/admin/doctor-info/${id}`)}
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

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Update Doctor Profile
          </h1>

          {/* Basic Info Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={editData?.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  placeholder="Dr. Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={editData?.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  placeholder="email@example.com"
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Specialization *
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={editData?.specialization || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  placeholder="e.g., Cardiology"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={editData?.experience || 0}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={editData?.bio || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                placeholder="Professional bio..."
                rows="4"
              />
            </div>
          </div>

          {/* Degrees Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Education & Qualifications
            </h2>
            <div className="space-y-6">
              {editData?.degrees.map((degree, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Degree {index + 1}
                    </h3>
                    {editData.degrees.length > 1 && (
                      <button
                        onClick={() => removeDegree(index)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Degree Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Name
                      </label>
                      <input
                        type="text"
                        value={degree.degreeName}
                        onChange={(e) =>
                          handleDegreeChange(index, "degreeName", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="e.g., MBBS"
                      />
                    </div>

                    {/* Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field
                      </label>
                      <input
                        type="text"
                        value={degree.field}
                        onChange={(e) =>
                          handleDegreeChange(index, "field", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="e.g., General Medicine"
                      />
                    </div>

                    {/* University */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        University
                      </label>
                      <input
                        type="text"
                        value={degree.university}
                        onChange={(e) =>
                          handleDegreeChange(
                            index,
                            "university",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="e.g., AIIMS Delhi"
                      />
                    </div>

                    {/* Year Completed */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Completed
                      </label>
                      <input
                        type="number"
                        value={degree.yearCompleted}
                        onChange={(e) =>
                          handleDegreeChange(
                            index,
                            "yearCompleted",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="e.g., 2020"
                        min="1950"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addDegree}
              className="mt-6 px-6 py-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-all duration-200 flex items-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Another Degree
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate(`/admin/doctor-info/${id}`)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              disabled={updating}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
