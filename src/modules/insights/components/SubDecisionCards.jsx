import { useMemo } from "react";
import { ChartTypes, Insight } from "da-insight-sdk";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

/**
 * MetricCard component for individual metric display
 * @param {Object} props - Component props
 * @param {Object} props.metric - Metric configuration
 * @param {string} props.category - Metric category (OUTPUT, DRIVER, INPUT)
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.tenantId - Tenant ID
 */
const MetricCard = ({ metric, category, workspaceId, tenantId }) => {
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

  const getCategoryColor = (category) => {
    switch (category) {
      case "OUTPUT":
        return "bg-green-100 text-green-800 border-green-200";
      case "DRIVER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "INPUT":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md px-3 py-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className={"text-xs max-w-32 truncate"} title={metric.metricLabel}>
            {metric.metricLabel}
          </p>
          {/* <span
            className={`text-[9px] px-1.5 py-0.5 rounded-full border uppercase tracking-wide ${getCategoryColor(
              category
            )}`}
          >
            {category.toLowerCase()}
          </span> */}
        </div>
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
  const categories = ["OUTPUT", "DRIVER", "INPUT"];

  const handleCardClick = () => {
    try {
      if (onNavigate && typeof onNavigate === "function" && subDecision?.id) {
        onNavigate(`/insights?decisionId=${subDecision.id}`);
      }
    } catch (error) {
      console.error("Sub-decision card navigation error:", error);
    }
  };

  return (
    <div
      className="bg-blue-50 border border-blue-200 p-3 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200 max-h-40 overflow-y-auto group"
      onClick={handleCardClick}
    >
      <h3 className="text-xs text-gray-800 mb-2 group-hover:text-blue-800 group-hover:underline">
        {subDecision?.name || "Unnamed Decision"}
      </h3>

      {metricConfig ? (
        <div className="space-y-1.5">
          {categories.map((category) => {
            const metrics = metricConfig[category] || [];
            if (metrics.length === 0) return null;

            return (
              <div key={category} className="grid grid-cols-1 gap-1.5">
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={`${category}-${index}`}
                    metric={metric}
                    category={category}
                    workspaceId={workspaceId}
                    tenantId={tenantId}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-2">
          <p className="text-xs">No metrics configured for this decision</p>
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
      <div className="mb-2">
        <h2 className="text-xs text-gray-600 mb-0.5">Signals from sub-decisions</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
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
