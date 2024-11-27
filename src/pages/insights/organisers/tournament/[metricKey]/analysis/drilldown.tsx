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
          title="Player participation by game type"
          type={ChartTypes.SIMPLE_CHART}
          metrics={[
            {
              metricKey: "participation_rate",
              metricLabel: "Player participation",
              chartType: ChartTypes.BAR,
            },
          ]}
          filters={{
            participation_rate: {
              showDimensionSplitIn: "event__game__game_type",
            },
          }}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Player participation by Frequency"
          type={ChartTypes.SIMPLE_CHART}
          metrics={[
            {
              metricKey: "participation_rate",
              metricLabel: "Player participation",
              chartType: ChartTypes.BAR,
            },
          ]}
          filters={{
            participation_rate: {
              showDimensionSplitIn: "user__platform",
            },
          }}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
