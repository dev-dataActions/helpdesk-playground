import { useRouter } from "next/router";
import { FeatureDetailPage } from "../../modules/insights/pages/FeatureDetailPage";

export default function FeatureDetailPageContainer() {
  const { query } = useRouter();
  return (
    <FeatureDetailPage
      workspaceId="asdfas-assadf-234234-sdf"
      appId="app_9a7d6508-a2c5-481e-868c-c26e69276238"
      apiKey="secret"
      featureId={query.featureId}
    />
  );
}
