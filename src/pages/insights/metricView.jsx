import { useRouter } from "next/router";
import { useTenantId } from "../../modules/insights/hooks/useTenantId";
import { useCallback } from "react";
import { MetricViewPage } from "../../modules/insights/pages/MetricViewPage";
import { ScreenLayout } from "da-apps-sdk";

export default function MetricViewPageContainer() {
  const router = useRouter();
  const { tenantId } = useTenantId();
  const handleNavigate = useCallback((path) => router.push(path), [router]);

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]} noPadding>
      <MetricViewPage
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
        decisionId={router?.query?.decisionId}
        tenantId={tenantId}
        onNavigate={handleNavigate}
      />
    </ScreenLayout>
  );
}
