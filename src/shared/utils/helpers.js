/**
 * Format date to readable format
 * @param {string} dateString - Date in ISO format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time to readable format (HH:MM)
 * @param {string} timeString - Time string
 * @returns {string} - Formatted time
 */
export const formatTime = (timeString) => {
  if (!timeString) return "";
  // If it's in HH:MM:SS format, just take HH:MM
  if (timeString.includes(":")) {
    return timeString.split(":").slice(0, 2).join(":");
  }
  return timeString;
};

/**
 * Get status color classes based on slot/appointment status
 * @param {string} status - Status (AVAILABLE, BOOKED, CONFIRMED, CANCELLED, DEACTIVATED)
 * @returns {string} - Tailwind color classes
 */
export const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "AVAILABLE":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "BOOKED":
    case "CONFIRMED":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "CANCELLED":
      return "bg-red-100 text-red-700 border-red-200";
    case "DEACTIVATED":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-blue-100 text-blue-700 border-blue-200";
  }
};

/**
 * Get status text with proper capitalization
 * @param {string} status - Status
 * @returns {string} - Status text
 */
export const getStatusText = (status) => {
  if (!status) return "AVAILABLE";
  return status.toUpperCase();
};

/**
 * Format doctor initials from name
 * @param {string} name - Doctor name
 * @returns {string} - Doctor initials (max 2 chars)
 */
export const getDoctorInitials = (name) => {
  if (!name) return "D";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Check if date is in the past
 * @param {string} dateString - Date in ISO format
 * @returns {boolean} - True if date is in past
 */
export const isPastDate = (dateString) => {
  if (!dateString) return false;
  const slotDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return slotDate < today;
};

/**
 * Check if date is today
 * @param {string} dateString - Date in ISO format
 * @returns {boolean} - True if date is today
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  const slotDate = new Date(dateString);
  const today = new Date();
  return slotDate.toDateString() === today.toDateString();
};

/**
 * Group array by property
 * @param {array} array - Array to group
 * @param {string} property - Property to group by
 * @returns {object} - Grouped object
 */
export const groupBy = (array, property) => {
  return array.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

/**
 * Sort array of objects by date
 * @param {array} array - Array to sort
 * @param {string} dateProperty - Date property to sort by
 * @returns {array} - Sorted array
 */
export const sortByDate = (array, dateProperty = "date") => {
  return array.sort((a, b) => new Date(a[dateProperty]) - new Date(b[dateProperty]));
};

/**
 * Get unique dates from array
 * @param {array} array - Array with date property
 * @param {string} dateProperty - Property name for date
 * @returns {array} - Sorted unique dates
 */
export const getUniqueDates = (array, dateProperty = "date") => {
  const dates = [...new Set(array.map((item) => item[dateProperty]))];
  return dates.sort();
};

/**
 * Filter array by date
 * @param {array} array - Array to filter
 * @param {string} date - Date to filter by
 * @param {string} dateProperty - Property name for date
 * @returns {array} - Filtered array
 */
export const filterByDate = (array, date, dateProperty = "date") => {
  if (!date || date === "all") return array;
  return array.filter((item) => item[dateProperty] === date);
};

/**
 * Filter array by status
 * @param {array} array - Array to filter
 * @param {string} status - Status to filter by
 * @param {string} statusProperty - Property name for status
 * @returns {array} - Filtered array
 */
export const filterByStatus = (array, status, statusProperty = "status") => {
  if (!status || status === "all") return array;
  return array.filter((item) => item[statusProperty]?.toUpperCase() === status.toUpperCase());
};

/**
 * Search array by multiple fields
 * @param {array} array - Array to search
 * @param {string} searchTerm - Search term
 * @param {array} fields - Fields to search in
 * @returns {array} - Filtered array
 */
export const searchArray = (array, searchTerm, fields = []) => {
  if (!searchTerm) return array;
  const term = searchTerm.toLowerCase();
  return array.filter((item) =>
    fields.some((field) => item[field]?.toLowerCase().includes(term))
  );
};

/**
 * Get available slots for a doctor
 * @param {array} slots - Array of slots
 * @returns {array} - Only available slots
 */
export const getAvailableSlots = (slots) => {
  return slots.filter((slot) => slot.status?.toUpperCase() === "AVAILABLE");
};

/**
 * Get booked appointments
 * @param {array} appointments - Array of appointments
 * @returns {array} - Only booked appointments
 */
export const getBookedAppointments = (appointments) => {
  return appointments.filter((apt) => apt.status?.toUpperCase() !== "CANCELLED");
};

/**
 * Check if slot is in the past
 * @param {string} date - Slot date
 * @param {string} endTime - End time
 * @returns {boolean} - True if in past
 */
export const isSlotInPast = (date, endTime) => {
  if (!date) return false;
  const slotDate = new Date(date);
  const today = new Date();
  
  // If date is in past, it's definitely in past
  if (slotDate < today) return true;
  
  // If date is today, check time
  if (slotDate.toDateString() === today.toDateString() && endTime) {
    const [hour, min] = endTime.split(":").map(Number);
    const now = new Date();
    const slotEndTime = new Date();
    slotEndTime.setHours(hour, min, 0);
    return slotEndTime < now;
  }
  
  return false;
};

/**
 * Get days until slot
 * @param {string} date - Slot date
 * @returns {number} - Days from today
 */
export const getDaysUntilSlot = (date) => {
  if (!date) return -1;
  const slotDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timeDiff = slotDate - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

/**
 * Group slots by date
 * @param {array} slots - Array of slots
 * @returns {object} - Slots grouped by date
 */
export const groupSlotsByDate = (slots) => {
  const grouped = {};
  slots.forEach((slot) => {
    if (!grouped[slot.date]) {
      grouped[slot.date] = [];
    }
    grouped[slot.date].push(slot);
  });
  
  // Sort dates
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
  const sortedGrouped = {};
  sortedDates.forEach((date) => {
    sortedGrouped[date] = grouped[date];
  });
  
  return sortedGrouped;
};

/**
 * Filter slots by date (alternative name)
 * @param {array} slots - Array of slots
 * @param {string} date - Date to filter by
 * @returns {array} - Filtered slots
 */
export const filterSlotsByDate = (slots, date) => {
  if (!date || date === "all") return slots;
  return slots.filter((slot) => slot.date === date);
};

/**
 * Filter slots by status
 * @param {array} slots - Array of slots
 * @param {string} status - Status to filter by
 * @returns {array} - Filtered slots
 */
export const filterSlotsByStatus = (slots, status) => {
  if (!status || status === "all") return slots;
  return slots.filter((slot) => slot.status?.toUpperCase() === status.toUpperCase());
};

/**
 * Search slots by term
 * @param {array} slots - Array of slots
 * @param {string} searchTerm - Search term
 * @returns {array} - Filtered slots
 */
export const searchSlots = (slots, searchTerm) => {
  if (!searchTerm) return slots;
  const term = searchTerm.toLowerCase();
  return slots.filter(
    (slot) =>
      slot.date?.toLowerCase().includes(term) ||
      slot.startTime?.includes(term) ||
      slot.endTime?.includes(term)
  );
};

/**
 * Validate time range
 * @param {string} startTime - Start time HH:MM:SS
 * @param {string} endTime - End time HH:MM:SS
 * @returns {boolean} - True if valid (end > start)
 */
export const validateTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return endMinutes > startMinutes;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} - Today's date
 */
export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Get booking statistics
 * @param {array} slots - Array of slots
 * @returns {object} - Stats with total, available, booked counts
 */
export const getBookingStats = (slots) => {
  return {
    total: slots.length,
    available: slots.filter((s) => s.status?.toUpperCase() === "AVAILABLE").length,
    booked: slots.filter((s) => s.status?.toUpperCase() === "BOOKED").length,
    deactivated: slots.filter((s) => s.status?.toUpperCase() === "DEACTIVATED").length,
  };
};
