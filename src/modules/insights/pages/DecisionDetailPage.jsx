import { useMemo } from "react";
// import { DecisionSummary } from "../../components/CFA/DecisionSummary";
// import { DecisionBoards } from "../../components/CFA/DecisionBoards";
import { getBreadcrumbs, getDecision } from "../utils/general.util";
import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { SubDecisions } from "../components/SubDecisions";
import { DecisionSummary } from "../components/DecisionSummary";
import { DecisionBoards } from "../components/DecisionBoards";

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
    <PanelLayout
      title={decision?.name}
      description={decision?.description}
      breadcrumbs={breadcrumbs}
    >
      <div className="flex justify-between items-start gap-6">
        <div className="flex-grow flex flex-col gap-12 pt-5">
          <DecisionSummary
            appId={appId}
            workspaceId={workspaceId}
            decisionId={decisionId ?? decisionTree.data.id}
          />
          <DecisionBoards
            appId={appId}
            workspaceId={workspaceId}
            decisionId={decisionId ?? decisionTree.data.id}
          />
        </div>
        <div className="w-[20%] flex flex-col gap-3 bg-blue-50 px-4 pt-2 pb-4 mt-5 rounded-md">
          <SubDecisions decisions={decision.children} />
        </div>
      </div>
    </PanelLayout>
  );
};
