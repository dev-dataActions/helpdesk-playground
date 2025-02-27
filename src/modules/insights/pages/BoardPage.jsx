import { Insight, ValidSpanColumns } from "da-insight-kit";
import { useBoard } from "../hooks/useBoard";
import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";

const BoardPage = ({ workspaceId, apiKey, boardId }) => {
  const { board, loading } = useBoard(workspaceId, boardId, apiKey);

  if (loading) return <Loading loaderText="Loading board..." />;

  if (!board) return <p className="mt-10">Board not found.</p>;

  return (
    <PanelLayout title={board.title} showBackButton>
      <div className="grid grid-cols-12 gap-2 pt-2">
        {board?.insights?.map((insight) => (
          <Insight
            key={insight.id}
            title={insight.title}
            type={insight.chartType}
            metrics={insight.metrics}
            filters={insight?.filters}
            options={{
              ...(insight?.options ?? {}),
              className: "h-64",
              spanCols: ValidSpanColumns.FOUR,
            }}
          />
        ))}
      </div>
    </PanelLayout>
  );
};

export default BoardPage;
