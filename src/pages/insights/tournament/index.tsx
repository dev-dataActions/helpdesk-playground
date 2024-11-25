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
      <DashboardLayout cols={ValidDashboardColumns.SIX} title="Reporting">
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Registrations"
          type={ChartTypes.BIGNUMBERWITHTREND}
          metrics={[
            {
              metricKey: "registrations",
              metricLabel: "Registrations",
            },
          ]}
          spanCols={ValidSpanColumns.TWO}
          className="h-60"
        />
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Active players"
          type={ChartTypes.BIGNUMBERWITHTREND}
          metrics={[
            {
              metricKey: "active_users",
              metricLabel: "Active players",
            },
          ]}
          spanCols={ValidSpanColumns.TWO}
          onClick={() => {
            router.push("/insights/tournament/analysis");
          }}
          className="h-60"
        />
        <Insight
          workspaceId={WORKSPACE_ID}
          title="Participation rate"
          type={ChartTypes.BIGNUMBERWITHTREND}
          metrics={[
            {
              metricKey: "participation_rate",
              metricLabel: "Participation rate",
            },
          ]}
          spanCols={ValidSpanColumns.TWO}
          className="h-60"
        />
         <Insight
          workspaceId={WORKSPACE_ID}
          title="Participation rate"
          type={ChartTypes.PIE}
          metrics={[
            { chartType:ChartTypes.PIE,
              metricKey: "participation_rate",
              metricLabel: "Participation rate",
            },
          ]}
          spanCols={ValidSpanColumns.TWO}
          className="h-60"
        />
         <Insight
          workspaceId={WORKSPACE_ID}
          title="Participation rate"
          type={ChartTypes.GEO}
          metrics={[
            { chartType:ChartTypes.GEO,
              metricKey: "participation_rate",
              metricLabel: "Participation rate",
            },
          ]}
          spanCols={ValidSpanColumns.TWO}
          className="h-60"
        />
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
