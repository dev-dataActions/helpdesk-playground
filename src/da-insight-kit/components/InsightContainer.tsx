import React from "react";
import { getInsightConfig, InsightConfig } from "../utils/insight.util.ts";
import { Insight, InsightFilters } from "./Insight.tsx";
import { ChartDataResolverMap } from "../dataResolvers/constants/dataResolvers.constant.ts";
import { ChartConfigResolverMap } from "../chartConfigResolvers/constants/chartConfigResolvers.contant.ts";
import { Entry } from "../dataResolvers/simple.ts";

interface InsightContainerProps {
  id: string;
  workspaceId: string;
}

export const InsightContainer: React.FC<InsightContainerProps> = ({ id, workspaceId = "" }) => {
  const { title, description, metrics, chartType }: InsightConfig = getInsightConfig(
    id,
    workspaceId
  );
  return (
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
  );
};
