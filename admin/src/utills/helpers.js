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
 * Get status color classes based on slot status
 * @param {string} status - Slot status (AVAILABLE, BOOKED, DEACTIVATED)
 * @returns {string} - Tailwind color classes
 */
export const getStatusColor = (status) => {
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

/**
 * Get status text with proper capitalization
 * @param {string} status - Slot status
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
 * Group slots by date
 * @param {array} slots - Array of slots
 * @returns {object} - Slots grouped by date with sorted dates
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
 * Get unique dates from slots
 * @param {array} slots - Array of slots
 * @returns {array} - Sorted unique dates
 */
export const getUniqueDates = (slots) => {
  const dates = [...new Set(slots.map((slot) => slot.date))];
  return dates.sort();
};

/**
 * Get unique doctors from slots
 * @param {array} slots - Array of slots
 * @returns {array} - Unique doctors with name and id
 */
export const getUniqueDoctors = (slots) => {
  const doctorMap = new Map();
  slots.forEach((slot) => {
    if (slot.doctorName && !doctorMap.has(slot.doctorName)) {
      doctorMap.set(slot.doctorName, slot);
    }
  });
  return Array.from(doctorMap.values());
};

/**
 * Filter slots by date
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
 * Search slots by doctor name or email
 * @param {array} slots - Array of slots
 * @param {string} searchTerm - Search term
 * @returns {array} - Filtered slots
 */
export const searchSlots = (slots, searchTerm) => {
  if (!searchTerm) return slots;
  const term = searchTerm.toLowerCase();
  return slots.filter((slot) => 
    slot.doctorName?.toLowerCase().includes(term) ||
    slot.email?.toLowerCase().includes(term)
  );
};

/**
 * Validate time range
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {boolean} - True if valid
 */
export const validateTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  
  const startTotalMin = startHour * 60 + startMin;
  const endTotalMin = endHour * 60 + endMin;
  
  return endTotalMin > startTotalMin;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} - Today's date
 */
export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Format slot time range
 * @param {string} startTime - Start time
 * @param {string} endTime - End time
 * @returns {string} - Formatted time range
 */
export const formatTimeRange = (startTime, endTime) => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};
