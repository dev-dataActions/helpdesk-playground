import { useRouter } from "next/router";
import { MetricWhyPage } from "../../../../../modules/insights/pages/MetricWhyPage";

export default function MetricsWhatPageContainer() {
  const { query } = useRouter();
  return (
    <MetricWhyPage
      workspaceId={process.env.NEXT_PUBLIC_DEMO_WORKSPACE_ID}
      metricId={query.metricId}
    />
  );
}
