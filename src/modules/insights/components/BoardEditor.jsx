import { memo, useCallback, useMemo } from "react";
import { ChartTypes, Insight } from "da-insight-sdk";
import { MarkupEditor } from "./MarkupEditor";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

const HEIGHT_CLASSES = {
  small: "h-40",
  medium: "h-60",
  large: "h-72",
  xlarge: "h-96",
};

const COLUMN_CLASSES = {
  1: "col-span-12",
  2: "col-span-6",
  3: "col-span-4",
  4: "col-span-3",
};

// Compute filters for each insight based on metrics, activeFilters, and existing filters
function computeInsightFilters(insight, activeFilters) {
  const filters = { ...insight?.filters };
  if (!insight?.metrics) return filters;
  insight.metrics.forEach((metric) => {
    const metricKey = metric.metricKey;
    const metricFilters =
      Object.keys(activeFilters)
        .filter((dimension) => !!activeFilters?.[dimension])
        .map((dimension) => ({
          key: dimension,
          value: activeFilters[dimension],
        })) || [];

    const existing = filters?.[metricKey] || {};
    // Remove any dimensionFilters for dimensions that are in activeFilters
    const preserved = (existing.dimensionFilters || []).filter((f) => !metricFilters || !metricFilters[f.dimension]);
    filters[metricKey] = {
      ...existing,
      dimensionFilters: [...preserved, ...metricFilters],
    };
  });
  console.log("filters", filters);
  return filters;
}

/**
 * InsightPreview component for rendering insights
 * @param {Object} props - Component props
 * @param {Object} props.insight - Insight configuration
 * @param {Object} props.timeRange - Time range configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {Function} props.onNavigate - Navigation handler
 * @param {string} props.tenantId - Tenant ID
 */
const InsightPreview = memo(({ insight, timeRange, workspaceId, boardId, tenantId, onNavigate, activeFilters }) => {
  const insightOptions = useMemo(
    () => ({ showExplanation: insight?.type !== ChartTypes.BIGNUMBER, ...insight?.options }),
    [insight]
  );
  const metricLabel = useMemo(
    () => insight?.metrics.find((m) => m.metricKey === insight?.metric_name)?.metricLabel,
    [insight]
  );

  const actions = useMemo(
    () => [
      {
        name: "Analysis View",
        onClick: () => {
          try {
            if (onNavigate && typeof onNavigate === "function") {
              onNavigate(`/insights/${boardId}/${insight?.metric_name}/what?metricLabel=${metricLabel}`);
            }
          } catch (error) {
            console.error("Navigation error:", error);
          }
        },
      },
      {
        name: "Insights View",
        onClick: () => {
          try {
            if (onNavigate && typeof onNavigate === "function") {
              onNavigate(`/insights/${boardId}/${insight?.metric_name}/why?metricLabel=${metricLabel}`);
            }
          } catch (error) {
            console.error("Navigation error:", error);
          }
        },
      },
    ],
    [insight?.metric_name, onNavigate]
  );

  const dataResolver = useCallback((payload) => fetchData(payload, workspaceId, tenantId), [workspaceId, tenantId]);

  const dimensionValuesResolver = useCallback(
    (dimension) => fetchDimensionValues(dimension, workspaceId, tenantId),
    [workspaceId, tenantId]
  );

  // Compute the correct filters for this insight
  const computedFilters = useMemo(() => computeInsightFilters(insight, activeFilters), [insight, activeFilters]);

  return (
    <Insight
      type={insight?.type}
      title={insight?.title}
      metrics={insight?.metrics}
      timeRange={timeRange}
      timeGrain={insight?.timeGrain}
      filters={computedFilters}
      options={insightOptions}
      actions={actions}
      dataResolver={dataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
    />
  );
});
InsightPreview.displayName = "InsightPreview";

/**
 * BoardEditor component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {Array} props.blocks - Board blocks
 * @param {Object} props.timeRange - Time range configuration
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.boardId - Board ID
 * @param {Function} props.onNavigate - Navigation handler
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.activeFilters - Active filters
 * @param {string} props.tenantId - Tenant ID
 */
export const BoardEditor = ({
  blocks = [],
  timeRange,
  workspaceId,
  boardId,
  tenantId,
  onNavigate = null,
  className = "",
  activeFilters = {},
}) => {
  // For backward compatibility, support both globalFilters and activeFilters

  if (!Array.isArray(blocks) || blocks.length === 0) {
    return (
      <div className={`grid grid-cols-12 gap-2 animate-fade-in ${className}`}>
        <div className="col-span-full text-center text-gray-500 p-8">No blocks available</div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-12 gap-3 animate-fade-in ${className}`}>
      {blocks.map((block) => (
        <div className="col-span-full" key={block?.id || "block"}>
          <div data-id={block?.id}>
            {block?.type === "Markup" ? (
              <MarkupEditor text={block?.config?.text ?? "Text"} />
            ) : block?.type === "Insight" ? (
              <InsightPreview
                insight={block?.config}
                timeRange={timeRange}
                workspaceId={workspaceId}
                boardId={boardId}
                tenantId={tenantId}
                onNavigate={onNavigate}
                activeFilters={activeFilters}
              />
            ) : (
              <div className={`grid grid-cols-12 gap-3`}>
                {Array.isArray(block?.config?.blocks) &&
                  block.config.blocks.map((subBlock, index) => {
                    if (subBlock?.type === "Markup") {
                      return (
                        <div key={index} className={COLUMN_CLASSES[block?.config?.columns] || "col-span-12"}>
                          <MarkupEditor text={block?.config?.text ?? "Text"} />
                        </div>
                      );
                    } else if (subBlock?.type === "Insight") {
                      return (
                        <div key={index} className={COLUMN_CLASSES[block?.config?.columns] || "col-span-12"}>
                          <InsightPreview
                            insight={{
                              ...subBlock?.config,
                              options: {
                                className: HEIGHT_CLASSES[block?.config?.height],
                              },
                            }}
                            timeRange={timeRange}
                            workspaceId={workspaceId}
                            boardId={boardId}
                            tenantId={tenantId}
                            onNavigate={onNavigate}
                            activeFilters={activeFilters}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="col-span-full text-center text-gray-500 p-4">
                          Invalid block type: {subBlock?.type}
                        </div>
                      );
                    }
                  })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
