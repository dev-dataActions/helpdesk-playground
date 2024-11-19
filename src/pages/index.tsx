import { Insight } from "@/da-insight-kit";
import { ChartConfigResolverMap } from "@/da-insight-kit/chartConfigResolvers/constants/chartConfigResolvers.contant";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { ChartDataResolverMap } from "@/da-insight-kit/dataResolvers/constants/dataResolvers.constant";

const AnalyticsPage = () => {
  return (
    <DashboardLayout cols={ValidDashboardColumns.SIX} title="KPI's summary">
      <Insight
        id="1"
        workspaceId="42eed85d-b1d7-4b8e-8621-1dfa79e72cf1"
        type={ChartTypes.SIMPLE_CHART}
        title="Active users"
        metrics={[
          {
            metricKey: "active_users",
            metricLabel: "Active users",
          },
        ]}
        description={"This is a Chart"}
        chartConfigResolver={() =>
          ChartConfigResolverMap[ChartTypes.SIMPLE_CHART]?.([
            { chartType:"AREA",
              metricKey: "active_users",
              metricLabel: "Active users",
            },
          ])
        }
        dataResolver={(_filters) =>
          ChartDataResolverMap[ChartTypes.SIMPLE_CHART]?.([
            {
              metricKey: "active_users",
              metricLabel: "Active users",
            },
          ], _filters)
        }
        spanCols={ValidSpanColumns.TWO}
        className="h-60"
      />
    </DashboardLayout>
  );
};

export default AnalyticsPage;
