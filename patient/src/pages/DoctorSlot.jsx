import React, { useEffect, useState } from "react";
import API from "../api/index.js";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate, formatTime } from "../utills/helpers.js";

function DoctorSlot() {
  const doctorId = useParams().id;
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSlot, setBookingSlot] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('all');

  async function fetchDoctorSlots() {
    try {
      setLoading(true);
      const data = await API.patient.getDoctorSlots(doctorId);
      console.log("Fetched doctor slots:", data);
      setSlots(data);
      // Extract doctor info from first slot if available
      if (data.length > 0 && data[0].doctor) {
        setDoctorInfo(data[0].doctor);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      showMessage("Failed to load slots. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function bookAppointment(slotId) {
    const appointmentData = {
      slotId: slotId,
    };
    console.log("Booking appointment with data:", appointmentData);
    try {
      setBookingSlot(slotId);
      const response = await API.patient.bookAppointment(appointmentData);
      showMessage("Appointment booked successfully! ", "success");
      // Refresh slots after booking
      await fetchDoctorSlots();
    } catch (error) {
      console.error("Error booking appointment:", error);
      showMessage(error.response?.data || "Failed to book appointment. Please try again.", "error");
    } finally {
      setBookingSlot(null);
    }
  }

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const isSlotAvailable = (slot) => {
    return slot.isAvailable !== false && !slot.isBooked;
  };

  const getUniqueDates = () => {
    const dates = [...new Set(slots.map(slot => slot.date))];
    return dates.sort();
  };

  const filteredSlots = selectedDate === 'all' 
    ? slots 
    : slots.filter(slot => slot.date === selectedDate);

  const groupSlotsByDate = () => {
    const grouped = {};
    filteredSlots.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  useEffect(() => {
    fetchDoctorSlots();
  }, [doctorId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back to Doctors</span>
        </button>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          } animate-[slideDown_0.3s_ease-out] shadow-sm`}>
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {/* Doctor Info Card */}
        {doctorInfo && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                {doctorInfo.profilePictureUrl ? (
                  <img 
                    src={doctorInfo.profilePictureUrl} 
                    alt={doctorInfo.user?.name}
                    className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-blue-100"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {doctorInfo.user?.name?.charAt(0) || "D"}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dr. {doctorInfo.user?.name || "Doctor"}
                </h1>
                {doctorInfo.specialization && (
                  <p className="text-lg text-gray-600 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">{doctorInfo.specialization}</span>
                  </p>
                )}
                {doctorInfo.user?.email && (
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{doctorInfo.user.email}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-center">
                  <p className="text-sm text-blue-600 font-medium">Available Slots</p>
                  <p className="text-2xl font-bold text-blue-700">{slots.filter(isSlotAvailable).length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Time Slots</h2>
          <p className="text-gray-600">Select a convenient time for your appointment</p>
        </div>

        {/* Date Filter */}
        {slots.length > 0 && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Filter by date:</span>
            <button
              onClick={() => setSelectedDate('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedDate === 'all'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
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
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading available slots...</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Slots Available</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                This doctor doesn't have any available time slots at the moment. Please check back later or try another doctor.
              </p>
            </div>
          </div>
        )}

        {/* Slots Grid - Grouped by Date */}
        {!loading && filteredSlots.length > 0 && (
          console.log("Rendering slots grouped by date:", groupSlotsByDate()) || true, // Log grouped slots
          <div className="space-y-8">
            {Object.entries(groupSlotsByDate()).map(([date, dateSlots]) => (
              <div key={date} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {new Date(date).getDate()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {formatDate(date)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {dateSlots.filter(isSlotAvailable).length} slots available
                    </p>
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {dateSlots.map((slot) => {
                    const available = isSlotAvailable(slot);
                    const isBooking = bookingSlot === slot.id;
                    
                    return (
                      <div
                        key={slot.id}
                        className={`group relative rounded-xl p-4 border-2 transition-all duration-200 ${
                          available
                            ? 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          {/* Time Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-200 ${
                            available 
                              ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>

                          {/* Time Range */}
                          <div className="mb-4">
                            <p className="text-lg font-bold text-gray-900">
                              {formatTime(slot.startTime)}
                            </p>
                            <p className="text-sm text-gray-500">to</p>
                            <p className="text-lg font-bold text-gray-900">
                              {formatTime(slot.endTime)}
                            </p>
                          </div>

                          {/* Book Button */}
                          {available ? (
                            <button
                              onClick={() => bookAppointment(slot.slotId)}
                              disabled={isBooking}
                              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              {isBooking ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                  Booking...
                                </span>
                              ) : (
                                'Book Now'
                              )}
                            </button>
                          ) : (
                            <div className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded-lg font-medium text-sm">
                              Not Available
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results for Filter */}
        {!loading && slots.length > 0 && filteredSlots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Slots for Selected Date</h3>
              <p className="text-gray-600">Try selecting a different date to see available slots.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorSlot;
