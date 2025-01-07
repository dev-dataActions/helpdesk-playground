import { DashboardLayout, IInsight, Insight, ValidDashboardColumns } from "da-insight-kit";
import useBoard from "../hooks/useBoard";

const BoardPage = ({ boardId }: { boardId: string }) => {
  const { board } = useBoard(boardId);

  if (!board) return <p className="mt-10">Board not found.</p>;

  return (
    <DashboardLayout title="Workflows" cols={ValidDashboardColumns.ONE}>
      <div className="flex flex-col gap-y-4 p-4 px-44">
        {board?.sections?.map((section) => (
          <>
            <h1 className="text-xl">{section.title}</h1>
            <div className="flex gap-x-4">
              {section.insights.map((insight: IInsight) => (
                <Insight
                  key={insight.id}
                  title={insight.title}
                  type={insight.chartType}
                  metrics={insight.metrics}
                  filters={insight?.filters}
                  options={{ className: "h-60" }}
                />
              ))}
            </div>
          </>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default BoardPage;
