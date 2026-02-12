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
    bio: "",
    profilePictureUrl: null,
    degrees: [],
  });
  const [currentDegree, setCurrentDegree] = useState({
    degreeName: "",
    field: "",
    university: "",
    yearCompleted: new Date().getFullYear(),
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

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

  const handleDegreeChange = (e) => {
    const { name, value } = e.target;
    setCurrentDegree((prev) => ({
      ...prev,
      [name]: name === "yearCompleted" ? parseInt(value) : value,
    }));
  };

  const addDegree = () => {
    if (
      !currentDegree.degreeName.trim() ||
      !currentDegree.field.trim() ||
      !currentDegree.university.trim() ||
      !currentDegree.yearCompleted
    ) {
      toast.error("Please fill all degree fields");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      degrees: [...prev.degrees, { ...currentDegree }],
    }));
    setCurrentDegree({
      degreeName: "",
      field: "",
      university: "",
      yearCompleted: new Date().getFullYear(),
    });
  };

  const removeDegree = (index) => {
    setFormData((prev) => ({
      ...prev,
      degrees: prev.degrees.filter((_, i) => i !== index),
    }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setUploadingImage(true);
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);

      // Upload image to get response with publicId and url
      const uploadResponse = await adminAPI.uploadImage(uploadFormData);
      
      // Store the full response object (publicId and url) - Cloudinary response structure
      const responseData = {
        publicId: uploadResponse.data.publicid,
        url: uploadResponse.data.url,
      };
      
      setUploadedImage(responseData);
      setFormData((prev) => ({
        ...prev,
        profilePictureUrl: responseData.url,
      }));
      
      setSelectedFile(null);
      toast.success("Image uploaded successfully!");
      // Store in localStorage for persistence
      localStorage.setItem("uploadedDoctorImage", JSON.stringify(responseData));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChangeImage = () => {
    setFormData((prev) => ({
      ...prev,
      profilePictureUrl: null,
    }));
    setUploadedImage(null);
    setSelectedFile(null);
    localStorage.removeItem("uploadedDoctorImage");
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
      
      // Prepare JSON payload instead of FormData
      const jsonPayload = {
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
        bio: formData.bio,
        degrees: formData.degrees,
        profilePictureUrl: formData.profilePictureUrl || null,
        profilePicturePublicId: uploadedImage?.publicId || null,
      };

      const response = await adminAPI.addNewDoctor(jsonPayload);
      
      toast.success("Doctor added successfully!");
      console.log("Add Doctor response:", response.data);
      
      // Reset form and redirect
      setFormData({ name: "", email: "", specialization: "", experience: "", bio: "", profilePictureUrl: null, degrees: [] });
      setSelectedFile(null);
      setUploadedImage(null);
      localStorage.removeItem("uploadedDoctorImage");
      navigate("/all-doctors");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/all-doctors")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Doctors
          </button>
          <h1 className="text-4xl font-bold text-blue-600 ">
            Add New Doctor
          </h1>
          <p className="text-gray-600 mt-2">Register a new doctor in the system</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-500 p-8">
          {/* Uploaded Image Preview */}
          {formData.profilePictureUrl && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src={formData.profilePictureUrl} 
                    alt="Doctor Profile" 
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-green-300 shadow-lg"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Uploaded
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-3">
                  Public ID: <span className="font-mono text-xs break-all text-gray-500">{uploadedImage?.publicId}</span>
                </p>
                <button
                  type="button"
                  onClick={handleChangeImage}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                >
                  Change Image
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 ">
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
                className="w-full px-4 py-3 rounded-xl border border-gray-500 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-500 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-500 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief biography of the doctor..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-500 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
            </div>

            {/* Profile Picture Field */}
            {!formData.profilePictureUrl && (
              <div >
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Profile Picture <span className="text-red-600">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      disabled={uploadingImage}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-500 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    {selectedFile && !uploadingImage && (
                      <button
                        type="button"
                        onClick={handleUploadImage}
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 whitespace-nowrap"
                      >
                        Upload Image
                      </button>
                    )}
                    {uploadingImage && (
                      <div className="px-6 py-3 bg-blue-400 text-white rounded-xl font-medium whitespace-nowrap flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </div>
                    )}
                  </div>

                  {selectedFile && !formData.profilePictureUrl && (
                    <p className="text-sm text-gray-600">
                      Selected: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Degrees Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Qualifications / Degrees</h3>
              
              {/* Add Degree Form */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree Name
                    </label>
                    <input
                      type="text"
                      name="degreeName"
                      value={currentDegree.degreeName}
                      onChange={handleDegreeChange}
                      placeholder="e.g., MBBS, MD, BDS"
                      className="w-full px-3 py-2 rounded-lg border border-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field
                    </label>
                    <input
                      type="text"
                      name="field"
                      value={currentDegree.field}
                      onChange={handleDegreeChange}
                      placeholder="e.g., General Medicine"
                      className="w-full px-3 py-2 rounded-lg border border-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={currentDegree.university}
                    onChange={handleDegreeChange}
                    placeholder="e.g., All India Institute of Medical Sciences (AIIMS)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year Completed
                    </label>
                    <input
                      type="number"
                      name="yearCompleted"
                      value={currentDegree.yearCompleted}
                      onChange={handleDegreeChange}
                      placeholder="e.g., 2020"
                      min="1950"
                      max={new Date().getFullYear()}
                      className="w-full px-3 py-2 rounded-lg border border-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addDegree}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200"
                    >
                      Add Degree
                    </button>
                  </div>
                </div>
              </div>

              {/* Display Added Degrees */}
              {formData.degrees.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Added Degrees ({formData.degrees.length})</h4>
                  {formData.degrees.map((degree, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-3">
                      <div>
                        <p className="font-medium text-gray-900">{degree.degreeName} in {degree.field}</p>
                        <p className="text-sm text-gray-600">{degree.university}</p>
                        <p className="text-xs text-gray-500">Completed: {degree.yearCompleted}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDegree(idx)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                disabled={loading || uploadingImage || !formData.profilePictureUrl}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-600 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Doctor...
                  </div>
                ) : !formData.profilePictureUrl ? (
                  "Upload Image First"
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
