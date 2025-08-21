import { useCallback } from "react";
import { useRouter } from "next/router";
import { useTenantId } from "../../modules/insights/hooks/useTenantId";
import { ScreenLayout } from "da-apps-sdk";
import { HomePage } from "../../modules/insights/pages/HomePage";
import { DecisionDetailPage } from "../../modules/insights/pages/DecisionDetailPage";

export default function InsightsPageContainer() {
  const router = useRouter();
  const { tenantId } = useTenantId();
  const handleNavigate = useCallback((path) => router.push(path), [router]);

  if (router?.query?.decisionId) {
    return (
      <ScreenLayout breadcrumbs={[{ name: "Insights" }]} noPadding>
        <DecisionDetailPage
          tenantId={tenantId}
          workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
          appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
          onNavigate={handleNavigate}
          decisionId={router?.query?.decisionId}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]} noPadding>
      <HomePage
        tenantId={tenantId}
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
        onNavigate={handleNavigate}
      />
    </ScreenLayout>
  );
}
