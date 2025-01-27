import { Insight, ValidSpanColumns } from "da-insight-kit";
import useBoard from "../hooks/useBoard";

const BoardPage = ({ workflowId, boardId }) => {
  const { board } = useBoard(workflowId, boardId);

  if (!board) return <p className="mt-10">Board not found.</p>;
  console.log(board);
  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl mb-3">{board.title}</h1>
      <div className="grid grid-cols-12 gap-4 pt-2">
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
    </div>
  );
};

export default BoardPage;
