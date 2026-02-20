import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminAPI } from "../api/adminAPI.js";
import  AdminC

function AddSlots() {

  const { doctors } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.endTime <= formData.startTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      setLoading(true);
    
      const startDateTime = `${formData.date}T${formData.startTime}:00`;
      const endDateTime = `${formData.date}T${formData.endTime}:00`;

      const response = await adminAPI.addDoctorSlot(parseInt(formData.doctorId), {
        startTime: startDateTime,
        endTime: endDateTime,
        date: formData.date,
      });

      toast.success("Slot added successfully!");
      console.log("Add Slot response:", response);

      setFormData({ doctorId: "", date: "", startTime: "", endTime: "" });
      navigate("/all-slots");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/all-slots")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Slots
          </button>
          <h1 className="text-4xl font-bold text-blue-600">
            Add New Time Slot
          </h1>
          <p className="text-gray-600 mt-2">Create a new appointment slot for a doctor</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Doctor <span className="text-red-600">*</span>
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization} ({doctor.experience}y)
                  </option>
                ))}
              </select>
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={today}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
            </div>

            {/* Time Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Start Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Start Time <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  End Time <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Time Summary */}
            {formData.startTime && formData.endTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Slot Duration:</span> {formData.startTime} - {formData.endTime}
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/all-slots")}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-600 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </div>
                ) : (
                  "Add Slot"
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
              <h4 className="font-semibold text-blue-900">Tip</h4>
              <p className="text-sm text-blue-700 mt-1">
                Only future dates can be selected. The slot duration determines appointment availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSlots;
