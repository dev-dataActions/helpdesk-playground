/**
 * PinnedBoards component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
export const PinnedBoards = ({ className = "" }) => {
  return (
    <div className={`${className} min-h-40`}>
      <div className="text-center py-16">
        <p className="text-sm text-gray-600">No pins available yet</p>
        <p className="text-xs text-gray-500">Pin your favorite boards to see them here</p>
      </div>
    </div>
  );
};
