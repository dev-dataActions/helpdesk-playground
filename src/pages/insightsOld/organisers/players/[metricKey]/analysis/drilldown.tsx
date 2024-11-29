import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";
import { ConfigType } from "../../../tournament/[metricKey]/analysis/drilldown";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";


const config: ConfigType = {
  revenue: [
    {
      id: 1,
      title: "Revenue",
      chartType: ChartTypes.RANKING,
      metrics: [
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
      id: 2,
      title: "Registrations Vs Revenue",
      chartType: ChartTypes.PIVOT,
      metrics: [
        {
          metricKey: "participation_rate",
          metricLabel: "Player participation",
          chartType: ChartTypes.PIVOT,
        },
      ],
      filters: {
        participation_rate: {
          showDimensionSplitIn: "user__platform",
        },
      },
    },
  ],
  active_users:[
    {
        id: 1,
        title: "Player Participation Frequency",
        chartType: ChartTypes.SIMPLE_CHART,
        metrics: [
          {
            metricKey: "participation_rate",
            metricLabel: "Player participation",
            chartType: ChartTypes.BAR,
          },
        ],
        filters: {
          participation_rate: {
            showDimensionSplitIn: "user__platform",
          },
        },
      },
      {
        id: 2,
        title: "Player participation by game type",
        chartType: ChartTypes.SIMPLE_CHART,
        metrics: [
          {
            metricKey: "participation_rate",
            metricLabel: "Player participation",
            chartType: ChartTypes.BAR,
          },
        ],
        filters: {
          participation_rate: {
            showDimensionSplitIn: "event__game__game_type",
          },
        },
      },
  ]
};

const AnalyticsPage: React.FC = () => {
  const router = useRouter();
  const metricKey = router?.query?.metricKey as keyof ConfigType;
  return (
    <DashboardLayout
      cols={ValidDashboardColumns.SIX}
      title="Drilldown along with contributors"
    >
      {config[metricKey]?.map((insight) => (
        <Insight
          key={insight.id}
          workspaceId={WORKSPACE_ID}
          title={insight.title}
          type={insight.chartType}
          metrics={insight.metrics}
          filters={insight.filters}
          spanCols={ValidSpanColumns.THREE}
          className="h-80"
        />
      ))}
    </DashboardLayout>
  );
};

export default AnalyticsPage;
