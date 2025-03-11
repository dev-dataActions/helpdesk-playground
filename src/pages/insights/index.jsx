import { useRouter } from "next/router";
import { FeatureDetailPage } from "../../modules/insights/pages/FeatureDetailPage";

export default function FeatureDetailPageContainer() {
  const { query } = useRouter();
  return (
    <FeatureDetailPage
      workspaceId="asdfas-assadf-234234-sdf"
      appId="app_8c2bcb42-53ae-45c5-a284-9d4ab7930135"
      featureId={query.featureId}
    />
  );
}
