import React from "react";
import { useFeatureBoards } from "../hooks/useFeatureBoards";
import { GoToCard } from "./GoToCard";

export const FeatureBoards = ({ workspaceId, appId, featureId }) => {
  const { boards, loading } = useFeatureBoards(workspaceId, appId, featureId);

  if (loading) return null;

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-sm">{`Dashboards (${boards?.length ?? "0"})`}</p>
          <p className="text-gray-500 font-light text-xs mb-3">
            Deepdive into your workflows and track progress
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {(!boards || boards?.length == 0) && (
          <p className="text-sm text-gray-600">No boards added yet.</p>
        )}
        {boards?.map((board) => (
          <div key={board.id} className="w-[32.6%]">
            <GoToCard
              name={board.name}
              description={board.description}
              goToText="Go to dashboard"
              href={`/insights/${board.board_id}?featureId=${featureId}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
