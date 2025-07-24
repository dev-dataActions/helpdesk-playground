import { GoChevronRight, GoLinkExternal } from "react-icons/go";

/**
 * GoToCard component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.name - Card title
 * @param {string} props.description - Card description
 * @param {string} props.goToText - Go to button text
 * @param {string} props.href - Link URL (optional, for backward compatibility)
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
export const GoToCard = ({
  name = "Title",
  description = "Description",
  goToText = "Go to",
  href = "#",
  onClick = null,
  className = "",
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

  return (
    <div
      className={`w-full h-full bg-white rounded-md border border-gray-300 flex flex-col justify-between ${className}`}
    >
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
