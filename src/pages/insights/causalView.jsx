import { useRouter } from "next/router";
import { useCallback } from "react";
import { CausalViewPage } from "../../modules/insights/pages/CausalViewPage";
import { ScreenLayout } from "da-apps-sdk";

export default function CausalViewPageContainer() {
  const router = useRouter();
  const handleNavigate = useCallback((path) => router.push(path), [router]);

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]} noPadding>
      <CausalViewPage
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
        decisionId={router?.query?.decisionId}
        onNavigate={handleNavigate}
      />
    </ScreenLayout>
  );
}
