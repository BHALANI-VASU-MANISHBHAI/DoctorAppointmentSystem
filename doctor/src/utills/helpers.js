/**
 * Format date from YYYY-MM-DD to readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date "Day, Month Date, Year"
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time from HH:MM:SS to HH:MM
 * @param {string} timeString - Time in HH:MM:SS format
 * @returns {string} - Formatted time HH:MM
 */
export const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5);
};

/**
 * Get color classes for status badge
 * @param {string} status - Status value
 * @returns {string} - Tailwind color classes
 */
export const getStatusColor = (status) => {
  if (!status) return "bg-gray-100 text-gray-800";
  
  switch (status.toUpperCase()) {
    case "AVAILABLE":
      return "bg-emerald-100 text-emerald-800";
    case "BOOKED":
      return "bg-amber-100 text-amber-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "DEACTIVATED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * Get normalized status text
 * @param {string} status - Status value
 * @returns {string} - Normalized status
 */
export const getStatusText = (status) => {
  return status?.toUpperCase() || "";
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
 * Get unique dates from slots
 * @param {array} slots - Array of slots
 * @returns {array} - Sorted unique dates
 */
export const getUniqueDates = (slots, dateProperty = "date") => {
  const dates = [...new Set(slots.map((slot) => slot[dateProperty]))];
  return dates.sort();
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
  const sorted = {};
  Object.keys(grouped)
    .sort()
    .forEach((date) => {
      sorted[date] = grouped[date];
    });
  
  return sorted;
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
 * Check if date is in past
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean} - True if in past
 */
export const isPastDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if date is today
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean} - True if today
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
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
