import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";
const config = {
  revenue: [
    {
      id: 1,
      title: "Revenue",
      chartType: ChartTypes.RANKING,
      metrics:[
        {
          metricKey: "participation_rate",
          metricLabel: "Player participation",
          chartType: ChartTypes.RANKING,
        },
      ],
      filters: {
        participation_rate: {
          showDimensionSplitIn: "event__game__game_type",
        },
      },
    },
    {
      id: 1,
      title: "Registrations Vs Revenue",
      chartType: ChartTypes.PIVOT,
      metrics: [
        {
          metricKey: "participation_rate",
          metricLabel: "Player participation",
          chartType: ChartTypes.PIVOT,
        },
      ],
      filters:{
        participation_rate: {
          showDimensionSplitIn: "user__platform",
        },
      }
    },
  ],
};
const AnalyticsPage = () => {
  const router = useRouter();
  return (
    <>
      <DashboardLayout cols={ValidDashboardColumns.SIX} title="Drilldown along with contributors">
      {config[router?.query?.metricKey]?.map((insight)=><Insight
          workspaceId={WORKSPACE_ID}
          title="Player participation by game type"
          type={insight?.chartType}
          metrics={insight?.metrics}
          filters={insight?.filters}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />)}
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
