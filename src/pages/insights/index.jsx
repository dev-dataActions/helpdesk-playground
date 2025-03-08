import { useRouter } from "next/router";
import { FeatureDetailPage } from "../../modules/insights/pages/FeatureDetailPage";

export default function FeatureDetailPageContainer() {
  const { query } = useRouter();
  return (
    <FeatureDetailPage
      workspaceId="asdfas-assadf-234234-sdf"
      appId="app_01464be9-2a02-471d-a873-f3df68f17c4a"
      featureId={query.featureId}
    />
  );
}
