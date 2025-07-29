import { useMemo } from "react";
import { FiTrendingUp, FiUsers, FiAward, FiInfo } from "react-icons/fi";
import { Error } from "../common/functional/Error";
import { PiChartBarThin } from "react-icons/pi";
import { Loader } from "../common/base/Loader";

/**
 * Individual insight item component
 * @param {Object} props - Component props
 * @param {string} props.insight - Insight text
 */
const InsightItem = ({ insight }) => {
  const icon = useMemo(() => {
    const iconMap = {
      trending: <FiTrendingUp className="w-4 h-4 text-blue-500" />,
      chart: <PiChartBarThin className="w-4 h-4 text-green-500" />,
      users: <FiUsers className="w-4 h-4 text-purple-500" />,
      award: <FiAward className="w-4 h-4 text-yellow-500" />,
      info: <FiInfo className="w-4 h-4 text-blue-900" />,
    };

    // Simple logic to assign icons based on content
    if (insight.toLowerCase().includes("trend") || insight.toLowerCase().includes("growth")) {
      return iconMap.trending;
    } else if (insight.toLowerCase().includes("region") || insight.toLowerCase().includes("contributor")) {
      return iconMap.users;
    } else if (insight.toLowerCase().includes("rank") || insight.toLowerCase().includes("top")) {
      return iconMap.award;
    } else if (insight.toLowerCase().includes("rate") || insight.toLowerCase().includes("percentage")) {
      return iconMap.chart;
    } else {
      return iconMap.info;
    }
  }, [insight]);

  return (
    <div className="flex items-start space-x-3 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-200 transition-colors">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-700 leading-relaxed">{insight}</p>
      </div>
    </div>
  );
};

/**
 * ExplanationInsightsFeed component for displaying insights
 * @param {Object} props - Component props
 * @param {Array<string>} props.insights - Array of insight strings
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @param {Function} props.onRefetch - Function to refetch data
 * @param {string} props.className - Additional CSS classes
 */
export const ExplanationInsightsFeed = ({
  insights = [],
  loading = false,
  error = null,
  onRefetch = null,
  className = "",
}) => {
  const filteredInsights = useMemo(
    () => insights.filter((insight) => typeof insight === "string" && insight?.length),
    [insights]
  );
  const hasInsights = useMemo(() => filteredInsights && filteredInsights.length > 0, [filteredInsights]);

  if (loading) {
    return (
      <div className={`h-full ${className}`}>
        <Loader loaderText="Loading insights..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-full ${className}`}>
        <Error errorText={error} fullScreen={false} onRetry={onRefetch} />
      </div>
    );
  }

  if (!hasInsights) {
    return (
      <div className={`h-full flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <FiInfo className="w-5 h-5 mx-auto mb-2 text-gray-500" />
          <p className="text-xs">No insights available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-300">
        <h3 className="text-xs text-gray-900">What's happening?</h3>
        <span className="text-xs text-blue-900 bg-blue-100 px-2 py-1 rounded-full">
          {filteredInsights.length} insights
        </span>
      </div>

      {/* Insights List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {filteredInsights.map((insight, index) => (
          <InsightItem key={`insight-${index}`} insight={insight} />
        ))}
      </div>
    </div>
  );
};
