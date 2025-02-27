import { useMemo } from "react";
import { Loading } from "../common/functional/Loading";
import { useFeatureMap } from "../hooks/useFeatureMap";
import { getBreadcrumbs, getFeature } from "../utils/general.util";
import { PanelLayout } from "../common/layout/PanelLayout";
import { SubFeatures } from "../components/SubFeatures";
import { FeatureSummary } from "../components/FeatureSummary";
import { FeatureBoards } from "../components/FeatureBoards";

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
      <div className="flex flex-col gap-y-5 pb-16">
        {feature?.children?.length > 0 && <SubFeatures features={feature.children} />}
        <FeatureSummary
          metrics={[
            {
              metric_name: "joined_players",
              metric_label: "Joined Players",
              featureId: "1740140245532",
            },
            {
              metric_name: "joined_players",
              metric_label: "Drop Off Players",
              featureId: "1740140245532",
            },
            {
              metric_name: "tournaments_organized",
              metric_label: "Tournaments Organized",
              featureId: "1740140245532",
            },
          ]}
        />
        <FeatureBoards featureId={featureId} workspaceId={workspaceId} />
      </div>
    </PanelLayout>
  );
};
