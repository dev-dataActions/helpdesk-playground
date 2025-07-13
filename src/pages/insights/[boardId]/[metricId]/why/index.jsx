import { useRouter } from "next/router";
import { MetricWhyPage } from "../../../../../modules/insights/pages/MetricWhyPage";
import { ScreenLayout } from "../../../../../modules/insights/common/layouts/ScreenLayout";

export default function MetricsWhyPageContainer() {
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
      <MetricWhyPage
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        metricId={router?.query?.metricId}
        metricLabel={router?.query?.metricLabel}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </ScreenLayout>
  );
}
