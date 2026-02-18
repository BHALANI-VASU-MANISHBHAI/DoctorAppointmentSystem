import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../shared/api/";
import AppointmentCard from "../components/AppointmentCard";
import { filterSlotsByDate, formatDate, getStatusColor, getUniqueDates, groupSlotsByDate } from "../../shared/utils/helpers.js";
function ViewSlots() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("all");

  async function getOwnSlots() {
    try {
      setLoading(true);
      const response = await API.doctor.getOwnSlots();
      console.log("Own slots:", response.data);
      setSlots(response.data.slots || response.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteSlot = async (slotId) => {
    
    try {
      // Call delete API
      await API.doctor.deleteSlot(slotId);
      setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
      toast.success("Slot deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      getOwnSlots(); // Refresh slots to restore deleted slot on error
      toast.error(error.response?.data || "Failed to delete slot. Restoring...");
    }
  };

  useEffect(() => {
    getOwnSlots();
  }, []);

  const filteredSlots = filterSlotsByDate(slots, selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            My Time Slots
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and view your available appointment slots
          </p>
        </div>

        {/* Date Filter */}
        {slots.length > 0 && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700">
              Filter by date:
            </span>
            <button
              onClick={() => setSelectedDate("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedDate === "all"
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300"
              }`}
            >
              All Dates
            </button>
            {getUniqueDates(slots).map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedDate === date
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300"
                }`}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading your slots...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && slots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-teal-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Slots Created
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                You haven't created any time slots yet. Create your first slot
                to accept patient appointments.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-medium hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={()=>navigate("/add-slot")}
              >
                Create Time Slot
              </button>
            </div>
          </div>
        )}

        {/* No Results for Filter */}
        {!loading && slots.length > 0 && filteredSlots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Slots for Selected Date
              </h3>
              <p className="text-gray-600">
                Try selecting a different date to see available slots.
              </p>
            </div>
          </div>
        )}

        {/* Slots Grid - Grouped by Date */}
        {!loading && filteredSlots.length > 0 && (
          <div className="space-y-8">
            {Object.entries(groupSlotsByDate(filteredSlots)).map(([date, dateSlots]) => (
              <div
                key={date}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {new Date(date).getDate()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {formatDate(date)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {dateSlots.length} slots
                    </p>
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {dateSlots.map((slot) => (
                    <AppointmentCard
                      key={slot.id}
                      slot={slot}
                      getStatusColor={getStatusColor}
                      onDelete={handleDeleteSlot}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSlots;