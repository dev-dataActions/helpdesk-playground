import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import { ConfigType } from "./drilldown"; 

const WORKSPACE_ID = "42eed85d-b1d7-4b8e-8621-1dfa79e72cf1";

const config: ConfigType = {
  revenue: [
    {
      id: 1,
      title: "Revenue",
      chartType: ChartTypes.SIMPLE_CHART,
      metrics: [
        {
          metricKey: "revenue",
          metricLabel: "Revenue",
          chartType: ChartTypes.AREA,
        },
      ],
      filters: {
        revenue: {
          compareWith: ["Min", "Max", "Average"],
        },
      },
    },
    {
      id: 2,
      title: "Registrations Vs Revenue",
      chartType: ChartTypes.SIMPLE_CHART,
      metrics: [
        {
          metricKey: "revenue",
          metricLabel: "Revenue",
          chartType: ChartTypes.AREA,
        },
        {
          metricKey: "registrations",
          metricLabel: "Registrations",
          chartType: ChartTypes.AREA,
          yAxisId: "right",
        },
      ],
    },
  ],
};

const AnalyticsPage: React.FC = () => {
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
        {config[metricKey]?.map((insight) => (
          <Insight
            key={insight.id}
            workspaceId={WORKSPACE_ID}
            title={insight.title}
            type={ChartTypes.SIMPLE_CHART}
            metrics={insight.metrics}
            filters={{
              active_users: {
                compareWith: ["Min", "Max", "Average"],
              },
            }}
            spanCols={ValidSpanColumns.TWO}
            className="h-80"
          />
        ))}
      </DashboardLayout>

      <p
        className="p-5 underline cursor-pointer text-sm text-center text-gray-600 font-normal flex items-center gap-1 justify-center"
        onClick={() =>
          router.push(
            `/insights/organisers/tournament/${router?.query?.metricKey}/analysis/drilldown`
          )
        }
      >
        Explore
        <FaChevronRight size={12} />
      </p>
    </>
  );
};

export default AnalyticsPage;
