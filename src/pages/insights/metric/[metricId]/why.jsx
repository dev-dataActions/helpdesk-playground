import { useRouter } from "next/router";
import { useTenantId } from "../../../../modules/insights/hooks/useTenantId";
import { ScreenLayout } from "da-apps-sdk";
import { MetricWhyPage } from "../../../../modules/insights/pages/MetricWhyPage";

export default function MetricsWhyPageContainer() {
  const router = useRouter();
  const { tenantId } = useTenantId();

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
        tenantId={tenantId}
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        metricId={router?.query?.metricId}
        metricLabel={router?.query?.metricLabel}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </ScreenLayout>
  );
}
