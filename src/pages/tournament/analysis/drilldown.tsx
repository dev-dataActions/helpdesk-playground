import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

const AnalyticsPage = () => {
  return (
    <>
      <DashboardLayout cols={ValidDashboardColumns.SIX} title="Drilldown along with contributors">
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Player participation by frequency"
          type={ChartTypes.SIMPLE_CHART}
          metrics={[
            {
              metricKey: "participation_rate",
              metricLabel: "Player participation frequency",
              chartType: ChartTypes.BAR,
            },
          ]}
          filters={{
            revenue: {
              showDimensionSplitIn: "customer__location",
            },
          }}
          spanCols={ValidSpanColumns.THREE}
          className="h-60"
        />
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Player participation by frequency"
          type={ChartTypes.SIMPLE_CHART}
          metrics={[
            {
              metricKey: "revenue",
              metricLabel: "Player participation frequency",
              chartType: ChartTypes.BAR,
            },
          ]}
          filters={{
            revenue: {
              showDimensionSplitIn: "customer__location",
            },
          }}
          spanCols={ValidSpanColumns.THREE}
          className="h-60"
        />
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
