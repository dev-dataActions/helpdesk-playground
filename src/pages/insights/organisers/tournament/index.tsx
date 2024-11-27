import { Insight } from "@/da-insight-kit";
import { Ranking } from "@/da-insight-kit/charts/Ranking";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

const metrics=[
  {
    id:1,
    metricKey:"registrations",
    metricLabel:"Registrations"
  },
  {
    id:2,
    metricKey:"tournaments_organised",
    metricLabel:"Tournaments Organised"
  },
  {
    id:3,
    metricKey:"avg_tourney_fill_rate",
    metricLabel:"Avg Tourney Fill Rate"
  },
  {
    id:4,
    metricKey:"revenue",
    metricLabel:"Revenue"
  },
]

const AnalyticsPage = () => {
  const router = useRouter();
  return (
    <>
      <DashboardLayout cols={ValidDashboardColumns.SIX} title="Reporting">
         {metrics.map((metric)=><Insight
         key={metric?.id}
          workspaceId={WORKSPACE_ID}
          title={metric?.metricLabel}
          type={ChartTypes.BIGNUMBERWITHTREND}
          metrics={[
            {
              metricKey: metric?.metricKey,
              metricLabel:metric?.metricLabel,
            },
          ]}
          onClick={() => {
            router.push(`/insights/organisers/tournament/${metric?.metricKey}/analysis`);
          }}
          spanCols={ValidSpanColumns.TWO}
          className="h-60"
        />) }
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
