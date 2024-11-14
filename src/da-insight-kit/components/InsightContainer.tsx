import React, { useMemo } from "react";
import { InsightConfig } from "../utils/insight.util.ts";
import { Insight, InsightFilters } from "./Insight.tsx";
import { ChartDataResolverMap } from "../dataResolvers/constants/dataResolvers.constant.ts";
import { ChartConfigResolverMap } from "../chartConfigResolvers/constants/chartConfigResolvers.contant.ts";
import { Entry } from "../dataResolvers/simple.ts";
import { useInsight } from "../hooks/useInsight.ts";

interface InsightContainerProps {
  insightId: string;
  workspaceId: string;
}

export const InsightContainer: React.FC<InsightContainerProps> = ({ insightId, workspaceId }) => {
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
      <div className="flex flex-wrap gap-2">
        {charts?.map(({ data: chart }) => {
          const { title, description, metrics, chartType }: InsightConfig = chart;
          return (
            <div className="h-60 w-72" key={JSON.stringify(metrics)}>
              <Insight
                id={JSON.stringify(metrics)}
                type={chartType}
                title={title}
                description={description}
                chartConfigResolver={() => ChartConfigResolverMap[chartType]?.(metrics)}
                dataResolver={(filters: InsightFilters | null): Promise<Entry[]> =>
                  ChartDataResolverMap[chartType]?.(metrics, filters, workspaceId)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
