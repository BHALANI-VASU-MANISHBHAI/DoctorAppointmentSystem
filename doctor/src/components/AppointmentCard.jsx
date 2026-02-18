import React, { useState } from "react";

const AppointmentCard = ({ slot, getStatusColor, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete(slot.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative rounded-xl p-4 border-2 border-gray-200 bg-white hover:border-teal-400 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col items-center text-center">
        {/* Time */}
        <div className="mb-4">
          <p className="text-lg font-bold">{slot.startTime}</p>
          <p className="text-sm text-gray-500">to</p>
          <p className="text-lg font-bold">{slot.endTime}</p>
        </div>

        {/* Status */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${getStatusColor(slot.status)}`}>
          {slot.status || "AVAILABLE"}
        </span>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting||slot.status === "BOOKED"}
          className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isDeleting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
