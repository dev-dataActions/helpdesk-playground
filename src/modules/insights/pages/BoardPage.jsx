import { Insight, ValidSpanColumns } from "da-insight-kit";
import { useBoard } from "../hooks/useBoard";
import { Loading } from "../common/functional/Loading";
import { PanelLayout } from "../common/layout/PanelLayout";
import { useMemo } from "react";

const InsightPreview = ({ insightConfig, featureId }) => {
  const options = useMemo(
    () => ({
      ...insightConfig.options,
      className: "h-60",
      spanCols: ValidSpanColumns.FOUR,
    }),
    [insightConfig.options]
  );

  const filters = useMemo(
    () => ({ ...insightConfig.filters, featureId: featureId }),
    [featureId, insightConfig.filters]
  );

  return (
    <Insight
      key={insightConfig.insight_id}
      title={insightConfig.title}
      type={insightConfig.chartType}
      metrics={insightConfig.metrics}
      options={options}
      filters={filters}
    />
  );
};

const BoardPage = ({ workspaceId, appId, boardId, featureId }) => {
  const { board, loading } = useBoard(workspaceId, appId, featureId, boardId);

  if (loading) return <Loading loaderText="Loading board..." />;

  if (!board) return <p className="mt-10">Board not found.</p>;

  return (
    <PanelLayout title={board.name} description={board.description} showBackButton>
      <div className="grid grid-cols-12 gap-4 px-8 py-2">
        {board?.insights?.map((insight) => (
          <InsightPreview key={insight.insight_id} insightConfig={insight} featureId={featureId} />
        ))}
      </div>
    </PanelLayout>
  );
};

export default BoardPage;
