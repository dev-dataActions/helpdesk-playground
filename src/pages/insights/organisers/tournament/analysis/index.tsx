import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";

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
              yAxisId: "right",
            },
          ]}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />
      </DashboardLayout>
      <p
        className="p-5 underline cursor-pointer text-sm text-center text-gray-600 font-normal flex items-center gap-1 justify-center"
        onClick={() => {
          router.push("/insights/organisers/tournament/analysis/drilldown");
        }}
      >
        Explore
        <FaChevronRight size={12} />
      </p>
    </>
  );
};

export default AnalyticsPage;
