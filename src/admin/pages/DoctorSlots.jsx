import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../shared/api";
import { AdminDoctorContext } from "../contexts/AdminDoctorContext.jsx";
import { SLOT_STATUSES } from "../../shared/utils/constants.js";
import { formatDate, getStatusColor, groupSlotsByDate } from "../../shared/utils/helpers.js";

function DoctorSlots() {
  const navigate = useNavigate();
  const { doctors } = useContext(AdminDoctorContext);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("AVAILABLE");

  // Fetch slots when doctor or status changes
  useEffect(() => {
    if (selectedDoctor) {
      fetchSlots();
    }
  }, [selectedDoctor, selectedStatus]);

  const fetchSlots = async () => {
    if (!selectedDoctor) return;

    try {
      setLoading(true);
      const response = await API.admin.getDoctorSlotsByStatus(selectedDoctor, selectedStatus);
      console.log("Doctor slots:", response.data);
      setSlots(response.data || []);
    } catch (error) {
      console.error("Error:", error);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };



  const handleDeleteSlot = async (slotId) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      console.log("Deleting slot with ID:", slotId);
      try {
        await API.admin.deleteSlot(slotId);
        setSlots(prevSlots => prevSlots.filter(slot => slot.slotId !== slotId));
        toast.success("Slot deleted successfully");
      } catch (error) {
        await fetchSlots();
        console.error("Error:", error);
      }
    }
  };

  const selectedDoctorData = doctors.find((d) => d.id.toString() === selectedDoctor);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Doctor Slots
          </h1>
          <p className="text-gray-600 mt-2">View and manage slots for a specific doctor</p>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Doctor Selection */}
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Select Doctor
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Filter by Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {SLOT_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedStatus === status
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Info Card */}
        {selectedDoctorData && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shrink-0">
                {selectedDoctorData.profilePictureUrl ? (
                  <img
                    src={selectedDoctorData.profilePictureUrl}
                    alt="Doctor Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>{selectedDoctorData.name?.charAt(0) || "D"}</span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDoctorData.name}</h2>
                <p className="text-blue-600 font-medium">{selectedDoctorData.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedDoctorData.experience} years experience</p>
                <p className="text-sm text-gray-600 mt-2">{selectedDoctorData.email}</p>
                {selectedDoctorData.bio && (
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">{selectedDoctorData.bio}</p>
                )}
                {selectedDoctorData.degrees && selectedDoctorData.degrees.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 uppercase mb-2">Qualifications</p>
                    <div className="space-y-1">
                      {selectedDoctorData.degrees.map((degree, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          <span className="font-medium">{degree.degreeName}</span> in {degree.field} from {degree.university} ({degree.yearCompleted})
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading slots...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && slots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Slots Found</h3>
              <p className="text-gray-600">
                {selectedStatus === "all"
                  ? "This doctor has no slots yet"
                  : `No slots with "${selectedStatus}" status`}
              </p>
            </div>
          </div>
        )}

        {/* Slots Grouped by Date */}
        {!loading && slots.length > 0 && (
          <div className="space-y-6">
            {Object.entries(groupSlotsByDate(slots)).map(([date, dateSlots]) => (
              <div key={date} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Date Header */}
                <div className="flex items-center gap-3 bg-blue-50 px-6 py-4 border-b border-gray-100">
                  <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {new Date(date).getDate()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{formatDate(date)}</h3>
                    <p className="text-sm text-gray-600">{dateSlots.length} slot{dateSlots.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Slots Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dateSlots.map((slot, index) => {
                        const startDate = new Date(`${slot.date}T${slot.startTime}`);
                        const endDate = new Date(`${slot.date}T${slot.endTime}`);
                        const durationMin =
                          (endDate.getTime() - startDate.getTime()) / (1000 * 60);

                        return (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors ${

                              index % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium text-gray-900">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {durationMin} minutes
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(slot.status)}`}>
                                {slot.status || "AVAILABLE"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => handleDeleteSlot(slot.slotId)}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                                  title="Delete"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Summary */}
        {!loading && slots.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>
              Showing <span className="font-semibold text-gray-900">{slots.length}</span> slot
              {slots.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorSlots;
