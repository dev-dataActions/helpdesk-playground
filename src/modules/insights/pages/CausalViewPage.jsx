import { useMemo } from "react";
import { useDecisionTree } from "../hooks/useDecisionTree";
import { getDecision } from "../utils/general.util";
import { Error, Loading, PanelLayout } from "da-apps-sdk";
import { LuSparkles } from "react-icons/lu";
import { CausalStories, DecisionTreeBreadcrumbs } from "../components";

export const CausalViewPage = ({ workspaceId, appId, decisionId, onNavigate }) => {
  const { decisionTree, loading: loadingDecisionTree, error: errorDecisionTree } = useDecisionTree(workspaceId, appId);
  const decision = useMemo(() => getDecision(decisionTree, decisionId), [decisionTree, decisionId]);

  if (loadingDecisionTree) {
    return <Loading loaderText="Loading decision tree and metric view..." />;
  }

  if (errorDecisionTree) {
    return <Error errorText={errorDecisionTree} />;
  }

  return (
    <PanelLayout
      title={
        <div className="flex items-center gap-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-purple-300/30 shadow-md shadow-purple-500/20">
            <LuSparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-normal text-gray-400 mb-0.5">{decision?.name}</p>
            <p>Causal View</p>
          </div>
        </div>
      }
      breadcrumbs={
        <DecisionTreeBreadcrumbs
          decisionTree={decisionTree}
          currentDecisionId={decisionId}
          onNavigate={(path) => onNavigate?.(path)}
        />
      }
      className={"max-w-4xl mx-auto !py-6 !px-4"}
    >
      <div className="border-t border-gray-200 pt-4">
        <CausalStories workspaceId={workspaceId} appId={appId} decisionId={decisionId} onNavigate={onNavigate} />
      </div>
    </PanelLayout>
  );
};
