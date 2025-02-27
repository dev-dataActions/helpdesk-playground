import React from "react";
import { Loading } from "../common/functional/Loading";
import { useFeatureBoards } from "../hooks/useFeatureBoards";
import { GoToCard } from "./GoToCard";

export const FeatureBoards = ({ workspaceId, featureId }) => {
  const { boards, loading } = useFeatureBoards(featureId, workspaceId);

  if (loading) return <Loading />;

  return (
    <div>
      <p className="mb-0.5">{`Dashboards (${boards?.length ?? ""})`}</p>
      <p className="text-gray-500 font-light text-xs mb-3">
        Deepdive into your workflows and track progress
      </p>
      <div className="flex flex-wrap gap-3">
        {boards.map((board) => (
          <div key={board.id} className="w-[32.6%]">
            <GoToCard
              name={board.name}
              description={board.description}
              goToText="Go to dashboard"
              href={`/insights/${board.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
