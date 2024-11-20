import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

const AnalyticsPage = () => {
  const router = useRouter();
  return (
    <>
      <DashboardLayout
        cols={ValidDashboardColumns.SIX}
        title={
          <div className="pb-2">
            <p>Analysis</p>
            <p
              className="underline cursor-pointer text-xs text-gray-600 font-normal"
              onClick={() => {
                router.push("/tournament/analysis/drilldown");
              }}
            >
              Explore
            </p>
          </div>
        }
      >
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Active players"
          type={ChartTypes.SIMPLE_CHART}
          metrics={[
            {
              metricKey: "active_users",
              metricLabel: "Active players",
              chartType: ChartTypes.AREA,
            },
          ]}
          filters={{
            active_users: {
              compareWith: ["Min", "Max", "Average"],
            },
          }}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Active Players vs Particiaption Rate"
          type={ChartTypes.SIMPLE_CHART}
          metrics={[
            {
              metricKey: "active_users",
              metricLabel: "Active Players",
              chartType: ChartTypes.LINE,
            },
            {
              metricKey: "participation_rate",
              metricLabel: "Participation Rate",
              chartType: ChartTypes.LINE,
            },
          ]}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
