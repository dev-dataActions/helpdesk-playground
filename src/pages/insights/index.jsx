import { useRouter } from "next/router";
import { DecisionDetailPage } from "../../modules/insights/pages/DecisionDetailPage";
import { ScreenLayout } from "../../modules/insights/common/layouts/ScreenLayout";
import { useTenantId } from "../../modules/insights/hooks/useTenantId";
import { HomePage } from "../../modules/insights/pages/HomePage";

export default function DecisionDetailPageContainer() {
  const router = useRouter();
  const { tenantId } = useTenantId();

  const handleNavigate = (path) => {
    try {
      router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  if (router?.query?.decisionId) {
    return (
      <ScreenLayout breadcrumbs={[{ name: "Insights" }]}>
        <DecisionDetailPage
          tenantId={tenantId}
          workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
          appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
          decisionId={router?.query?.decisionId}
          onNavigate={handleNavigate}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]}>
      <HomePage
        tenantId={tenantId}
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
        onNavigate={handleNavigate}
      />
    </ScreenLayout>
  );
}
