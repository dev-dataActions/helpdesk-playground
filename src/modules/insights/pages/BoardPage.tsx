import { DashboardLayout, IInsight, Insight, ValidDashboardColumns } from "da-insight-kit";
import useBoard from "../hooks/useBoard";

const BoardPage = ({ boardId }: { boardId: string }) => {
  const { board } = useBoard(boardId);

  if (!board) return <p className="mt-10">Board not found.</p>;

  return (
    <div className="p-16 px-40">
      <h1 className="text-2xl font-semibold mb-3">{board.title}</h1>
      <div className="flex flex-col gap-y-4">
        {board?.sections?.map((section, index) => (
          <div key={index}>
            <DashboardLayout title={section.title ?? ""} cols={ValidDashboardColumns.TWELVE}>
              {section.insights.map((insight: IInsight) => (
                <Insight
                  key={insight.id}
                  title={insight.title}
                  type={insight.chartType}
                  metrics={insight.metrics}
                  filters={insight?.filters}
                  options={insight?.options}
                />
              ))}
            </DashboardLayout>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
