import { useRouter } from "next/router";
import { MetricWhatPage } from "../../../../../modules/insights/pages/MetricWhatPage";

export default function MetricsWhatPageContainer() {
  const { query } = useRouter();
  return (
    <MetricWhatPage
      workspaceId={process.env.NEXT_PUBLIC_DEMO_WORKSPACE_ID}
      metricId={query.metricId}
    />
  );
}
