import { useMemo } from "react";
import { Insight, ValidSpanColumns } from "da-insight-sdk";
import { useAppDecisionInsights } from "../hooks/useAppDecisionInsights";

const InsightPreview = ({ insightConfig, altitude }) => {
  const options = useMemo(
    () => ({
      ...insightConfig.options,
      className: "h-60",
      spanCols: ValidSpanColumns.FOUR,
    }),
    [insightConfig.options]
  );

  const filters = useMemo(
    () => ({ ...insightConfig.filters, featureId: altitude }),
    [altitude, insightConfig.filters]
  );

  return (
    <Insight
      key={insightConfig.insight_id}
      title={insightConfig.title}
      type={insightConfig.chartType}
      metrics={insightConfig.metrics}
      options={options}
      filters={filters}
    />
  );
};

export const DecisionSummary = ({ workspaceId, appId, decisionId }) => {
  const { insights: appDecisionInsights } = useAppDecisionInsights(workspaceId, appId, decisionId);

  if (!appDecisionInsights) return null;

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm mb-0.5">{`Summary (${appDecisionInsights?.length ?? ""})`}</p>
          <p className="text-gray-500 font-light text-xs mb-3">
            Understand how your business is working
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {appDecisionInsights?.length == 0 && (
          <p className="text-sm text-gray-600 w-72">No insights added yet.</p>
        )}
        {appDecisionInsights?.map((insight) => (
          <div key={insight.insight_id} className="w-[32.4%]">
            <InsightPreview insightConfig={insight} altitudeId={decisionId} />
          </div>
        ))}
      </div>
    </div>
  );
};
