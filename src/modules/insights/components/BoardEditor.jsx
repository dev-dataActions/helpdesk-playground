import React, { memo, useMemo } from "react";
import { Insight, ValidSpanColumns } from "da-insight-sdk";
import { MarkupEditor } from "./MarkupEditor";

const InsightPreview = memo(({ insight, featureId, filters }) => {
  const insightFilters = useMemo(
    () => ({
      ...insight?.filters,
      ...filters,
      featureId: featureId,
    }),
    [insight?.filters, featureId, filters]
  );

  const insightOptions = useMemo(
    () => ({
      ...(insight?.options ?? {}),
      className: "h-64",
      spanCols: ValidSpanColumns.FOUR,
    }),
    [insight?.options]
  );

  return (
    <Insight
      key={insight.insight_id}
      title={insight.title}
      type={insight.chartType}
      metrics={insight.metrics}
      filters={insightFilters}
      options={insightOptions}
    />
  );
});
InsightPreview.displayName = "InsightPreview";

export const BoardEditor = ({ blocks, featureId, filters }) => {
  return (
    <div className={`grid grid-cols-12 gap-2 animate-fade-in`}>
      {blocks?.map((block) => (
        <div className="col-span-full" key={block.id}>
          <div data-id={block.id}>
            {block.type === "Markup" ? (
              <MarkupEditor text={block.config.text ?? "Text"} />
            ) : (
              <InsightPreview insight={block.config} featureId={featureId} filters={filters} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
