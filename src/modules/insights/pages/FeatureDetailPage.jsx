import { useMemo } from "react";
import { Loading } from "../common/functional/Loading";
import { useFeatureMap } from "../hooks/useFeatureMap";
import { getBreadcrumbs, getFeature } from "../utils/general.util";
import { PanelLayout } from "../common/layout/PanelLayout";
import { SubFeatures } from "../components/SubFeatures";

export const FeatureDetailPage = ({ workspaceId, apiKey, featureId = "" }) => {
  const { featureMap, loading } = useFeatureMap(workspaceId, apiKey);

  const { breadcrumbs, feature } = useMemo(() => {
    if (featureMap === undefined) return {};
    const breadcrumbs = getBreadcrumbs(featureMap, featureId);
    const feature = getFeature(featureMap, featureId);
    return { breadcrumbs, feature };
  }, [featureMap, featureId]);

  if (loading) {
    return <Loading loaderText="Loading feature map..." />;
  }

  if (!feature || !breadcrumbs) {
    return <Loading loaderText="Loading feature details..." />;
  }

  return (
    <PanelLayout title={feature.name} description={feature.description} breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-y-4">
        <SubFeatures features={feature.children} />
      </div>
    </PanelLayout>
  );
};
