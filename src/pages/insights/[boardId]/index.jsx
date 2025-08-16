import { useRouter } from "next/router";
import { useCallback } from "react";
import BoardPage from "../../../modules/insights/pages/BoardPage";
import { ScreenLayout } from "da-apps-sdk";
import { useTenantId } from "../../../modules/insights/hooks/useTenantId";

export default function BoardPageContainer() {
  const router = useRouter();
  const { tenantId } = useTenantId();

  const handleNavigate = useCallback(
    (path) => {
      try {
        router.push(path);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
    [router]
  );

  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      console.error("Back navigation error:", error);
    }
  }, [router]);

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]}>
      <BoardPage
        tenantId={tenantId}
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
        boardId={router?.query?.boardId}
        decisionId={router?.query?.decisionId}
        onNavigate={handleNavigate}
        onBack={handleBack}
      />
    </ScreenLayout>
  );
}
