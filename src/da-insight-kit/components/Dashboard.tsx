import React, { useMemo } from "react";
import { InsightConfig } from "../utils/insight.util.ts";
import { Insight } from "./Insight.tsx";
import { useInsight } from "../hooks/useInsight.ts";

interface InsightContainerProps {
  insightId: string;
  workspaceId: string;
}

export const Dashboard: React.FC<InsightContainerProps> = ({ insightId, workspaceId }) => {
  const { insight } = useInsight(workspaceId, insightId);
  const charts = useMemo(
    () => insight?.formatter?.blocks.filter((block) => block.type === "insight"),
    [insight]
  );
  return (
    <div className="p-5">
      <div className="text-lg lg:text-2xl text-left font-semibold text-gray-800 mb-2">
        {insight?.formatter?.name}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {charts?.map(({ data: chart }) => {
          const { title, description, metrics, chartType }: InsightConfig = chart;
          return (
            <div className="h-60" key={JSON.stringify(metrics)}>
              <Insight
                id={JSON.stringify(metrics)}
                workspaceId={workspaceId}
                type={chartType}
                title={title}
                description={description}
                metrics={metrics}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
