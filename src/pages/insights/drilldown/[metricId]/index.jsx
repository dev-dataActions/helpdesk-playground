import { useRouter } from "next/router";
import { useTenantId } from "../../../../modules/insights/hooks/useTenantId";
import { ScreenLayout } from "da-apps-sdk";
import { MetricDrilldownPage } from "../../../../modules/insights/pages/MetricDrilldownPage";

export default function MetricsWhatPageContainer() {
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
      <MetricDrilldownPage
        tenantId={tenantId}
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        metricLabel={router?.query?.metricLabel}
        metricId={router?.query?.metricId}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </ScreenLayout>
  );
}
