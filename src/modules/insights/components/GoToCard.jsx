import { GoChevronRight, GoLinkExternal, GoPin } from "react-icons/go";

/**
 * GoToCard component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.name - Card title
 * @param {string} props.description - Card description
 * @param {string} props.goToText - Go to button text
 * @param {string} props.href - Link URL (optional, for backward compatibility)
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.isPinned - Whether the card is pinned
 * @param {Function} props.onPinToggle - Pin toggle handler function
 * @param {string} props.boardId - Board ID for pin functionality
 * @param {string} props.decisionId - Decision ID for pin functionality
 */
export const GoToCard = ({
  name = "Title",
  description = "Description",
  goToText = "Go to",
  href = "#",
  onClick = null,
  className = "",
  isPinned = false,
  onPinToggle = null,
  boardId = null,
  decisionId = null,
}) => {
  const handleClick = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (onClick && typeof onClick === "function") {
        onClick(e);
      } else if (href && href !== "#") {
        // Fallback to href if onClick is not provided
        window.open(href, "_blank");
      }
    } catch (error) {
      console.error("GoToCard click error:", error);
    }
  };

  const handlePinToggle = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (onPinToggle && typeof onPinToggle === "function" && boardId && decisionId) {
        onPinToggle(boardId, decisionId, isPinned);
      }
    } catch (error) {
      console.error("GoToCard pin toggle error:", error);
    }
  };

  return (
    <div
      className={`w-full h-full bg-white rounded-md border border-gray-300 flex flex-col justify-between relative ${className}`}
    >
      {/* Pin button - only show if pin functionality is available */}
      {onPinToggle && boardId && decisionId && (
        <button
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          onClick={handlePinToggle}
          title={isPinned ? "Unpin board" : "Pin board"}
        >
          {isPinned ? (
            <GoPin size={16} className="text-blue-500" />
          ) : (
            <GoPin size={16} className="text-gray-600 hover:text-blue-500" />
          )}
        </button>
      )}

      <div className="flex items-start gap-x-3 p-4">
        <div className="p-2.5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
          <GoLinkExternal size={16} />
        </div>
        <div className="bg-white">
          <h3 className="text-sm">{name}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-end px-4 py-2 border-t border-gray-200">
        <button
          className="flex gap-x-1 items-center text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer text-xs transition-colors bg-transparent border-none p-0"
          onClick={handleClick}
        >
          {goToText}
          <GoChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
