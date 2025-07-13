/**
 * SubDecisions component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {Array} props.decisions - Array of decision objects
 * @param {Function} props.onDecisionClick - Decision click handler
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const SubDecisions = ({ decisions = [], onDecisionClick = null, onNavigate = null, className = "" }) => {
  const handleDecisionClick = (decision, index) => {
    try {
      if (onDecisionClick && typeof onDecisionClick === "function") {
        onDecisionClick(decision, index);
      } else if (onNavigate && typeof onNavigate === "function" && decision?.id) {
        // Default navigation behavior
        onNavigate(`/insights?decisionId=${decision.id}`);
      }
    } catch (error) {
      console.error("SubDecision click error:", error);
    }
  };

  if (!Array.isArray(decisions) || decisions.length === 0) {
    return (
      <div className={className}>
        <div className="flex justify-between items-center gap-2 mb-1">
          <p className="text-xs text-gray-600">Sub decisions (0)</p>
        </div>
        <div className="text-xs text-gray-500 p-2">No sub decisions available</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center gap-2 mb-1">
        <p className="text-xs text-gray-600">{`Sub decisions (${decisions.length})`}</p>
      </div>

      <div className="flex flex-col gap-2 items-end">
        {decisions.map((decision, index) => (
          <div
            key={decision?.id || index}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:shadow-md cursor-pointer flex gap-1 items-center justify-between group transition-all"
            onClick={() => handleDecisionClick(decision, index)}
          >
            <span className="text-xs hover:underline flex-grow">{decision?.name || "Unknown decision"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
