import { useMemo } from "react";
import { Loading } from "../common/functional/Loading";
import { useFeatureMap } from "../hooks/useFeatureMap";
import { getBreadcrumbs, getFeature } from "../utils/general.util";
import { PanelLayout } from "../common/layout/PanelLayout";
import { SubFeatures } from "../components/SubFeatures";
import { FeatureSummary } from "../components/FeatureSummary";
import { FeatureBoards } from "../components/FeatureBoards";

export const FeatureDetailPage = ({ workspaceId, appId, featureId }) => {
  const { featureMap, loading } = useFeatureMap(workspaceId);

  const { breadcrumbs, feature } = useMemo(() => {
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
      <div className={`flex flex-col gap-y-10 pb-16 ${feature.children.length == 0 ? "pt-6" : ""}`}>
        <SubFeatures features={feature.children} />
        <FeatureSummary
          workspaceId={workspaceId}
          appId={appId}
          featureId={featureId ?? featureMap.data.id}
        />
        <FeatureBoards
          featureId={featureId ?? featureMap.data.id}
          workspaceId={workspaceId}
          appId={appId}
        />
      </div>
    </PanelLayout>
  );
};
