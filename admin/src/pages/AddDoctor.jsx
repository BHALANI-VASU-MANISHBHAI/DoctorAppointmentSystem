import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../api/adminAPI.js";

function AddDoctor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });

  const specializations = [
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Dermatologist",
    "Orthopedist",
    "Psychiatrist",
    "Radiologist",
    "Oncologist",
    "General Practitioner",
    "ENT",
    "Ophthalmologist",
    "Dentist",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Doctor name is required");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Valid email is required");
      return;
    }
    if (!formData.specialization) {
      toast.error("Please select a specialization");
      return;
    }
    if (!formData.experience || formData.experience < 0) {
      toast.error("Experience must be a valid number");
      return;
    }

    try {
      setLoading(true);
      const response = await adminAPI.addNewDoctor({
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
      });
      
      toast.success("Doctor added successfully!");
      console.log("Add Doctor response:", response.data);
      
      // Reset form and redirect
      setFormData({ name: "", email: "", specialization: "", experience: "" });
      navigate("/all-doctors");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/all-doctors")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Doctors
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Add New Doctor
          </h1>
          <p className="text-gray-600 mt-2">Register a new doctor in the system</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Doctor Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Dr. Vasu"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="doctor@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* Specialization Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Specialization <span className="text-red-600">*</span>
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              >
                <option value="">Select a specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Years of Experience <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 10"
                min="0"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/all-doctors")}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </div>
                ) : (
                  "Add Doctor"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM10 7a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900">Note</h4>
              <p className="text-sm text-blue-700 mt-1">
                A temporary password will be sent to the doctor's email. They can reset it upon first login.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
