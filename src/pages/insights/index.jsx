import { useRouter } from "next/router";
import { DecisionDetailPage } from "../../modules/insights/pages/DecisionDetailPage";
import { ScreenLayout } from "../../modules/insights/common/layouts/ScreenLayout";

export default function DecisionDetailPageContainer() {
  const router = useRouter();

  const handleNavigate = (path) => {
    try {
      router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <ScreenLayout breadcrumbs={[{ name: "Insights" }]}>
      <DecisionDetailPage
        workspaceId={process.env.NEXT_PUBLIC_WORKSPACE_ID}
        appId={process.env.NEXT_PUBLIC_CFA_APP_ID}
        decisionId={router?.query?.decisionId}
        onNavigate={handleNavigate}
      />
    </ScreenLayout>
  );
}
