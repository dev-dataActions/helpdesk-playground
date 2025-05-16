import { memo, useMemo } from "react";
import { Insight, ValidSpanColumns } from "da-insight-sdk";
import { MarkupEditor } from "./MarkupEditor";
import { useRouter } from "next/router";

const InsightPreview = memo(({ insight, filters }) => {
  const router = useRouter();
  const { query } = router;
  const { boardId } = query;

  const insightFilters = useMemo(
    () => ({
      ...insight?.filters,
      ...filters,
    }),
    [insight?.filters, filters]
  );

  const insightOptions = useMemo(
    () => ({
      className: "h-64",
      spanCols: ValidSpanColumns.FOUR,
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
      type={insight.chartType}
      metrics={insight.metrics}
      filters={insightFilters}
      options={insightOptions}
      actions={actions}
    />
  );
});
InsightPreview.displayName = "InsightPreview";

export const BoardEditor = ({ blocks, filters }) => {
  return (
    <div className={`grid grid-cols-12 gap-2 animate-fade-in`}>
      {blocks?.map((block) => (
        <div className="col-span-full" key={block.id}>
          <div data-id={block.id}>
            {block.type === "Markup" ? (
              <MarkupEditor text={block.config.text ?? "Text"} />
            ) : (
              <InsightPreview insight={block.config} filters={filters} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
