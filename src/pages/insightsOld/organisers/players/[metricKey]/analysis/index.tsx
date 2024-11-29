import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import { ConfigType } from "../../../tournament/[metricKey]/analysis/drilldown";

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

const config = {
  active_users: [
    {
      id: 1,
      title: "Active players",
      chartType: ChartTypes.SIMPLE_CHART,
      metrics: [
        {
          metricKey: "active_users",
          metricLabel: "Active players",
          chartType: ChartTypes.AREA,
        },
      ],
      filters: {
        active_users: {
          compareWith: ["Min", "Max", "Average"],
        },
      },
    },
    {
      id: 2,
      title: "Active players",
      chartType: ChartTypes.SIMPLE_CHART,
      metrics: [
        {
          metricKey: "participation_rate",
          metricLabel: "Participation Rate",
          chartType: ChartTypes.AREA,
        },
        {
          metricKey: "active_users",
          metricLabel: "Active players",
          chartType: ChartTypes.AREA,
        },
      ],
    },
  ],
};

const AnalyticsPage = () => {
  const router = useRouter();
  const metricKey = router?.query?.metricKey as keyof ConfigType;
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
        {config[metricKey]?.map((insight, index) => (
          <Insight
            workspaceId={WORKSPACE_ID}
            title={insight.title}
            key={index}
            type={insight.chartType}
            metrics={insight.metrics}
            filters={insight.filters}
            spanCols={ValidSpanColumns.THREE}
            className="h-80"
          />
        ))}
      </DashboardLayout>
      <p
        className="p-5 underline cursor-pointer text-sm text-center text-gray-600 font-normal flex items-center gap-1 justify-center"
        onClick={() => {
          router.push(`/insights/organisers/players/${metricKey}/analysis/drilldown`);
        }}
      >
        Explore
        <FaChevronRight size={12} />
      </p>
    </>
  );
};

export default AnalyticsPage;
