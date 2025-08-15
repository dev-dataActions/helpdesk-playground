import { HiOutlineChartBar } from "react-icons/hi";

/**
 * PinnedMetrics component with empty state placeholder
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
export const PinnedMetrics = () => {
  return (
    <div>
      <div className="text-center py-8 border border-gray-200 rounded-lg bg-white">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <HiOutlineChartBar className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-900 mb-1">No pinned metrics yet</p>
        <p className="text-xs text-gray-500">Pin your favorite metrics to see them here</p>
      </div>
    </div>
  );
};
