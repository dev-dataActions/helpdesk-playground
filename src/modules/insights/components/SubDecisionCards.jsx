import { useMemo } from "react";
import { ChartTypes, Insight } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../../container/services/insights.svc";
import { HiOutlineLocationMarker, HiOutlineArrowRight } from "react-icons/hi";
import { GoChevronRight } from "react-icons/go";

/**
 * MetricCard component for individual metric display
 * @param {Object} props - Component props
 * @param {Object} props.metric - Metric configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 */
const MetricCard = ({ metric, workspaceId, tenantId }) => {
  const insightConfig = useMemo(
    () => ({
      type: ChartTypes.BIGNUMBER,
      title: metric.metricLabel,
      metrics: [
        {
          metricKey: metric.metricKey,
          metricLabel: metric.metricLabel,
        },
      ],
      options: {
        micro: true,
        hideCard: true,
        hideTitle: true,
      },
    }),
    [metric]
  );

  const dataResolver = useMemo(() => (payload) => fetchData(payload, workspaceId, tenantId), [workspaceId, tenantId]);
  const dimensionValuesResolver = useMemo(
    () => (dimension) => fetchDimensionValues(dimension, workspaceId, tenantId),
    [workspaceId, tenantId]
  );

  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-xs text-gray-600">{metric.metricLabel}</span>
      <div className="flex items-center gap-2">
        <div className="w-auto">
          <Insight
            type={insightConfig.type}
            title={insightConfig.title}
            metrics={insightConfig.metrics}
            options={insightConfig.options}
            dataResolver={dataResolver}
            dimensionValuesResolver={dimensionValuesResolver}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * SubDecisionCard component for individual sub-decision
 * @param {Object} props - Component props
 * @param {Object} props.subDecision - Sub-decision object
 * @param {Object} props.metricConfig - Metric configuration for the sub-decision
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {Function} props.onNavigate - Navigation handler function
 */
const SubDecisionCard = ({ subDecision, metricConfig, workspaceId, tenantId, onNavigate }) => {
  const handleCardClick = () => {
    try {
      if (onNavigate && typeof onNavigate === "function" && subDecision?.id) {
        onNavigate(`/insights?decisionId=${subDecision.id}`);
      }
    } catch (error) {
      console.error("Sub-decision card navigation error:", error);
    }
  };

  // Only show OUTPUT metrics as signals
  const outputMetrics = metricConfig?.OUTPUT || [];

  return (
    <div
      className="bg-white border border-gray-200 p-4 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200 group"
      onClick={handleCardClick}
    >
      {/* Header with location icon and title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-blue-100 p-2 rounded-md">
          <HiOutlineLocationMarker className="w-4 h-4 text-orange-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-800 transition-colors duration-200">
            {subDecision?.name || "Unnamed Decision"}
          </h3>
        </div>
        <HiOutlineArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
      </div>

      {/* Metrics section */}
      {outputMetrics.length > 0 ? (
        <div className="space-y-1">
          {outputMetrics.map((metric, index) => (
            <MetricCard key={`output-${index}`} metric={metric} workspaceId={workspaceId} tenantId={tenantId} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs text-gray-600">No output metrics available</p>
        </div>
      )}
    </div>
  );
};

/**
 * SubDecisionCards component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {Array} props.subDecisions - Array of sub-decision objects
 * @param {Object} props.metricViewConfig - Metric configuration mapping
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const SubDecisionCards = ({
  subDecisions = [],
  metricViewConfig = {},
  workspaceId,
  tenantId,
  onNavigate = null,
  className = "",
}) => {
  if (!Array.isArray(subDecisions) || subDecisions.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <GoChevronRight className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-base font-medium text-foreground">Jump into sub-decisions</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {subDecisions.map((subDecision, index) => (
          <SubDecisionCard
            key={subDecision?.id || index}
            subDecision={subDecision}
            metricConfig={metricViewConfig[subDecision?.id] || null}
            workspaceId={workspaceId}
            tenantId={tenantId}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};
