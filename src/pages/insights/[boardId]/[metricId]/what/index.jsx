import { useRouter } from "next/router";
import { MetricWhatPage } from "../../../../../modules/insights/pages/MetricWhatPage";
import { ScreenLayout } from "../../../../../modules/insights/common/layouts/ScreenLayout";

export default function MetricsWhatPageContainer() {
  const router = useRouter();

  const handleNavigate = (path) => {
    try {
      router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error("Back navigation error:", error);
    }
  };

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]}>
      <MetricWhatPage
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        metricLabel={router?.query?.metricLabel}
        metricId={router?.query?.metricId}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </ScreenLayout>
  );
}
