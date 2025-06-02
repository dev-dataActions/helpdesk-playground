import { GoToCard } from "./GoToCard";
import { useDecisionBoards } from "../hooks/useDecisionBoards";

export const DecisionBoards = ({ workspaceId, appId, decisionId }) => {
  const { boards, loading } = useDecisionBoards(workspaceId, appId, decisionId);

  if (loading) return null;

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-sm">{`Dashboards (${boards?.length ?? "0"})`}</p>
          <p className="text-gray-500 font-light text-xs mb-3 w-72">
            Deepdive into your workflows and track progress
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {(!boards || boards?.length == 0) && (
          <p className="text-sm text-gray-600">No boards added yet.</p>
        )}
        {boards?.map((board) => (
          <div key={board.id} className="w-full">
            <GoToCard
              name={board.name}
              description={board.description}
              goToText="Go to dashboard"
              href={`/insights/${board.board_id}?decisionId=${decisionId}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
