import { useMemo } from "react";
import { getBreadcrumbs, getDecision } from "../utils/general.util";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { SubDecisions } from "../components/SubDecisions";
import { DecisionSummary } from "../components/DecisionSummary";
import { DecisionBoards } from "../components/DecisionBoards";
import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layouts/PanelLayout";

export const DecisionDetailPage = ({ workspaceId, appId, decisionId }) => {
  const { decisionTree, loading } = useDecisionTree(workspaceId, appId);

  const { breadcrumbs, decision } = useMemo(() => {
    const breadcrumbs = getBreadcrumbs(workspaceId, appId, decisionTree, decisionId);
    const decision = getDecision(decisionTree, decisionId);
    return { breadcrumbs, decision };
  }, [workspaceId, appId, decisionTree, decisionId]);

  if (loading) {
    return <Loading loaderText="Loading decision tree..." />;
  }

  if (!decision || !breadcrumbs) {
    return <Loading loaderText="Loading decision details..." />;
  }

  return (
    <PanelLayout title={decision?.name} description={decision?.description} breadcrumbs={breadcrumbs}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex-grow flex flex-col gap-12 pt-5">
          <DecisionSummary appId={appId} workspaceId={workspaceId} decisionId={decisionId ?? decisionTree.data.id} />
          <DecisionBoards appId={appId} workspaceId={workspaceId} decisionId={decisionId ?? decisionTree.data.id} />
        </div>
        {decision.children?.length > 0 && (
          <div className="min-w-[20%] flex flex-col gap-3 bg-blue-50 px-2 pt-1 mt-5 rounded-md">
            <SubDecisions decisions={decision.children} />
          </div>
        )}
      </div>
    </PanelLayout>
  );
};
