import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../api/adminAPI.js";
import { toast } from "react-toastify";

function AllSlots() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  async function fetchAllSlots() {
    try {
      setLoading(true);
      const response = await adminAPI.getAllSlots();
      console.log("All slots:", response.data);
      setSlots(response.data || []);
    } catch (error) {
      toast.error(error.response?.data || "Failed to fetch slots");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllSlots();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "AVAILABLE":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "BOOKED":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "DEACTIVATED":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const filteredSlots = slots.filter((slot) => {
    // Filter by date - only show future dates (>= today)
    const slotDate = new Date(slot.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const matchesDateFilter = slotDate >= today;

    const matchesSearch =
      slot.doctor?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.doctor?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || slot.status?.toUpperCase() === filterStatus.toUpperCase();

    return matchesSearch && matchesStatus && matchesDateFilter;
  });

  // Group slots by date and sort
  const groupSlotsByDate = () => {
    const grouped = {};
    filteredSlots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    
    // Sort groups by date
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
    const sortedGrouped = {};
    sortedDates.forEach((date) => {
      sortedGrouped[date] = grouped[date];
    });
    
    return sortedGrouped;
  };

  const getUniqueStatuses = () => {
    const statuses = [...new Set(slots.map((slot) => slot.status))];
    return statuses.filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              All Time Slots
            </h1>
            <p className="text-gray-600 mt-2">View and manage all available appointment slots</p>
          </div>
          <button
            onClick={() => navigate("/add-slots")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Slot
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by doctor name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            >
              <option value="all">All Status</option>
              {getUniqueStatuses().map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading slots...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && slots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Slots Created</h3>
              <p className="text-gray-600">No time slots have been created yet</p>
            </div>
          </div>
        )}

        {/* No Search Results */}
        {!loading && slots.length > 0 && filteredSlots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}

        {/* Slots Grouped by Date */}
        {!loading && filteredSlots.length > 0 && (
          <div className="space-y-6">
            {Object.entries(groupSlotsByDate()).map(([date, dateSlots]) => (
              <div key={date} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Date Header */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {new Date(date).getDate()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{formatDate(date)}</h3>
                    <p className="text-sm text-gray-600">{dateSlots.length} slot{dateSlots.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Slots Table for this Date */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Doctor</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Specialization</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dateSlots.map((slot, index) => (
                        <tr
                          key={slot.id}
                          className={`border-b border-gray-100 hover:bg-purple-50/30 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {slot.doctor?.user?.name?.charAt(0) || "D"}
                              </div>
                              <span className="font-medium text-gray-900">{slot.doctor?.user?.name || "Doctor"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {slot.doctor?.user?.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                            {slot.doctor?.specialization || "General"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(slot.status)}`}>
                              {slot.status || "AVAILABLE"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors" title="View">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && slots.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>
              Showing <span className="font-semibold text-gray-900">{filteredSlots.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{slots.length}</span> slots
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllSlots;
