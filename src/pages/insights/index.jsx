import { useRouter } from "next/router";
import { DecisionDetailPage } from "../../modules/insights/pages/DecisionDetailPage";

export default function FeatureDetailPageContainer() {
  const { query } = useRouter();

  const mode = process.env.NEXT_PUBLIC_PRODUCT_MODE;
  const appId =
    mode === "LITE"
      ? process.env.NEXT_PUBLIC_LITE_CFA_APP_ID
      : process.env.NEXT_PUBLIC_PRO_CFA_APP_ID;

  return (
    <DecisionDetailPage
      workspaceId={process.env.NEXT_PUBLIC_DEMO_WORKSPACE_ID}
      appId={appId}
      decisionId={query.decisionId}
    />
  );
}
