import { useRouter } from "next/router";
import { FeatureDetailPage } from "../../modules/insights/pages/FeatureDetailPage";

export default function FeatureDetailPageContainer() {
  const { query } = useRouter();
  return (
    <FeatureDetailPage
      workspaceId="asdfas-assadf-234234-sdf"
      apiKey="secret"
      featureId={query.featureId}
    />
  );
}
