import React from "react";

const AppointmentCard = ({ slot, getStatusColor }) => {
  return (
    <div className="group relative rounded-xl p-4 border-2 border-gray-200 bg-white hover:border-teal-400 hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex flex-col items-center text-center">
        {/* Time */}
        <div className="mb-4">
          <p className="text-lg font-bold">{slot.startTime}</p>
          <p className="text-sm text-gray-500">to</p>
          <p className="text-lg font-bold">{slot.endTime}</p>
        </div>

        {/* Status */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(slot.status)}`}>
          {slot.status || "AVAILABLE"}
        </span>

      </div>
    </div>
  );
};

export default AppointmentCard;
