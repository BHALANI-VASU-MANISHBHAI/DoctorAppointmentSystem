/**
 * Simple Status Badge Component
 */
function StatusBadge({ status, className = "" }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${className}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
