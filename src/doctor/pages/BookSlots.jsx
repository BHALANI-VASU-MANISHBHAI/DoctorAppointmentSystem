import { useEffect, useState } from "react";
import API from "../../shared/api/";
import { formatDate, getStatusColor, groupSlotsByDate } from "../../shared/utils/helpers.js";

function BookSlots() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('all');

  async function getBookedAppointments() {
    try {
      setLoading(true);
      const response = await API.doctor.getBookedAppointments();
      console.log("Booked appointments:", response.data);
      setAppointments(response.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const getUniqueDates = () => {
    const dates = [...new Set(appointments.map(apt => apt.date))];
    return dates.sort();
  };

  const filteredAppointments = selectedDate === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.date === selectedDate);

  useEffect(() => {
    getBookedAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Booked Appointments
          </h1>
          <p className="text-gray-600 mt-2">View all patient appointments scheduled with you</p>
        </div>

        {/* Date Filter */}
        {appointments.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Filter by Date
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedDate('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedDate === 'all'
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-300'
                }`}
              >
                All Dates
              </button>
              {getUniqueDates().map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedDate === date
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading appointments...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-linear-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments</h3>
              <p className="text-gray-600">You don't have any booked appointments yet</p>
            </div>
          </div>
        )}

        {/* Appointments Grouped by Date */}
        {!loading && filteredAppointments.length > 0 && (
          <div className="space-y-6">
            {Object.entries(groupSlotsByDate(filteredAppointments)).map(([date, dateAppointments]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-teal-200">
                  <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {new Date(date).getDate()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{formatDate(date)}</h3>
                    <p className="text-sm text-gray-600">{dateAppointments.length} appointment{dateAppointments.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Appointments for this date */}
                <div className="space-y-4">
                  {dateAppointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm border border-gray-500 hover:shadow-md hover:scale-102 hover:border-teal-800 transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* Patient Info */}
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-14 h-14 bg-linear-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                              {appointment.patientName.charAt(0) || "P"}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {appointment.patientName || "Patient"}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                                  {appointment.status || "Pending"}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span>{appointment.patientEmail}</span>
                                </div>
                              </div>

                              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="font-medium">{formatDate(appointment.date)}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{appointment.startTime} - {appointment.endTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default BookSlots;