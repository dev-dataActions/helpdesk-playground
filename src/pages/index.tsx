import { Insight } from "@/da-insight-kit";
import {
  DashboardLayout,
  ValidDashboardColumns,
} from "@/da-insight-kit/components/DashboardLayout";
import { ValidSpanColumns } from "@/da-insight-kit/components/Insight";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";

const AnalyticsPage = () => {
  return (
    <DashboardLayout cols={ValidDashboardColumns.SIX} title="KPI's summary">
      <Insight
        id="1"
        workspaceId="42eed85d-b1d7-4b8e-8621-1dfa79e72cf1"
        type={ChartTypes.BIGNUMBER}
        title="Active users"
        metrics={[
          {
            metricKey: "active_users",
            metricLabel: "Active users",
          },
        ]}
        spanCols={ValidSpanColumns.TWO}
        className="h-60"
      />
    </DashboardLayout>
  );
};

export default AnalyticsPage;
