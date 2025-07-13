import { memo, useMemo } from "react";
import { Insight } from "da-insight-sdk";
import { MarkupEditor } from "./MarkupEditor";
import { useRouter } from "next/router";
import { fetchData, fetchDimensionValues } from "../common/services/insights.svc";

const HEIGHT_CLASSES = {
  small: "h-40",
  medium: "h-60",
  large: "h-72",
  xlarge: "h-96",
};

const COLUMN_CLASSES = {
  1: "col-span-12",
  2: "col-span-6",
  3: "col-span-4",
  4: "col-span-3",
};

const InsightPreview = memo(({ insight, timeRange, workspaceId }) => {
  const router = useRouter();
  const { query } = router;
  const { boardId } = query;

  const insightOptions = useMemo(
    () => ({
      className: "h-64",
      ...(insight?.options ?? {}),
    }),
    [insight?.options]
  );

  const actions = useMemo(
    () => [
      {
        name: "Analysis View",
        onClick: () => router.push(`/insights/${boardId}/${insight.metric_name}/what`),
      },
      {
        name: "Insights View",
        onClick: () => router.push(`/insights/${boardId}/${insight.metric_name}/why`),
      },
    ],
    []
  );

  return (
    <Insight
      title={insight.title}
      key={insight.insight_id}
      type={insight.type}
      metrics={insight.metrics}
      timeGrain={insight.timeGrain}
      filters={insight.filters}
      timeRange={timeRange}
      options={insightOptions}
      actions={actions}
      workspaceId={workspaceId}
      dataResolver={(payload) => fetchData(payload, workspaceId)}
      dimensionValuesResolver={(dimension) => fetchDimensionValues(dimension, workspaceId)}
    />
  );
});
InsightPreview.displayName = "InsightPreview";

export const BoardEditor = ({ blocks, timeRange, workspaceId }) => {
  console.log(blocks);
  return (
    <div className={`grid grid-cols-12 gap-2 animate-fade-in`}>
      {blocks?.map((block) => (
        <div className="col-span-full" key={block.id}>
          <div data-id={block.id}>
            {block.type === "Markup" ? (
              <MarkupEditor text={block.config.text ?? "Text"} />
            ) : block.type === "Insight" ? (
              <InsightPreview insight={block.config} timeRange={timeRange} workspaceId={workspaceId} />
            ) : (
              <div className={`grid grid-cols-12 gap-3`}>
                {block.config.blocks.map((subBlock) => {
                  if (subBlock.type === "Markup")
                    return (
                      <div className={COLUMN_CLASSES[block.config.columns]}>
                        <MarkupEditor text={block.config.text ?? "Text"} />
                      </div>
                    );
                  else if (subBlock.type === "Insight")
                    return (
                      <div className={COLUMN_CLASSES[block.config.columns]}>
                        <InsightPreview
                          insight={{ ...subBlock.config, options: { className: HEIGHT_CLASSES[block.config.height] } }}
                          timeRange={timeRange}
                          workspaceId={workspaceId}
                        />
                      </div>
                    );
                  else return <div>Invalid block type</div>;
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
