import { Insight, ValidSpanColumns } from "da-insight-kit";
import { useAppFeatureInsights } from "../hooks/useAppFeatureInsights";
import { useMemo } from "react";

const InsightPreview = ({ insightConfig, handleRemoveInsight, featureId }) => {
  const options = useMemo(
    () => ({
      ...insightConfig.options,
      className: "h-60",
      spanCols: ValidSpanColumns.FOUR,
    }),
    [insightConfig.options]
  );

  const filters = useMemo(
    () => ({ ...insightConfig.filters, featureId: featureId }),
    [featureId, insightConfig.filters]
  );

  const actions = useMemo(
    () =>
      !!handleRemoveInsight
        ? [{ name: "Delete", onClick: () => handleRemoveInsight(insightConfig) }]
        : [],
    [handleRemoveInsight, insightConfig]
  );

  return (
    <Insight
      key={insightConfig.insight_id}
      title={insightConfig.title}
      type={insightConfig.chartType}
      metrics={insightConfig.metrics}
      options={options}
      filters={filters}
      actions={actions}
    />
  );
};

export const FeatureSummary = ({ workspaceId, appId, featureId }) => {
  const { insights: appFeatureInsights } = useAppFeatureInsights(workspaceId, appId, featureId);
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm mb-0.5">{`Summary (${appFeatureInsights?.length ?? ""})`}</p>
          <p className="text-gray-500 font-light text-xs mb-3">
            Understand how your business is working
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {appFeatureInsights.length == 0 && (
          <p className="text-sm text-gray-600">No insights added yet.</p>
        )}
        {appFeatureInsights.map((insight) => (
          <div key={insight.insight_id} className="w-[32.6%]">
            <InsightPreview insightConfig={insight} featureId={featureId} />
          </div>
        ))}
      </div>
    </div>
  );
};
