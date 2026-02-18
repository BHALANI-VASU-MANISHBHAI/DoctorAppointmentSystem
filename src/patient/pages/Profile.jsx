import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../shared/api/index.js";
import { UserContext } from "../../shared/contexts/UserContext.jsx";

function Profile() {
  const { user } = useContext(UserContext);
  const [updating, setUpdating] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      const userData = user.data?.data || user.data || user;
      setEditData({
        name: userData.name || "",
        profilePicture: null,
      });
      setPreviewImage(userData.profilePictureUrl || null);
    }
  }, [user]);

  const handleNameChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (!editData.name.trim()) {
        toast.error("Name is required");
        return;
      }

      setUpdating(true);

      const formData = new FormData();
      formData.append("name", editData.name);
      if (editData.profilePicture) {
        formData.append("profilePicture", editData.profilePicture);
      }

      const response = await API.patient.updateProfile(formData);
      const updatedData = response.data?.data || response.data || response;
      
      setEditData({
        name: updatedData.name || "",
        profilePicture: null,
      });
      setPreviewImage(updatedData.profilePictureUrl || null);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const userData = user.data?.data || user.data || user;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">Update your profile information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="space-y-8">
            {/* Profile Picture Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Profile Picture
              </label>
              <div className="flex items-end gap-6">
                {/* Current/Preview Picture */}
                <div className="shrink-0">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                      {userData?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div>
                  <label htmlFor="photoInput" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 cursor-pointer inline-block shadow-sm">
                    Change Photo
                  </label>
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Name Section */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={editData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Section (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={userData?.email || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Update Button */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditData({
                    name: userData.name || "",
                    profilePicture: null,
                  });
                  setPreviewImage(userData.profilePictureUrl || null);
                }}
                disabled={updating}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={updating}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Profile</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Note:</span> You can update your name and profile picture anytime. Your email address is permanent for security reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
