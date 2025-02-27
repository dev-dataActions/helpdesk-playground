import { Insight, ChartTypes, ValidSpanColumns } from "da-insight-kit";

export const FeatureSummary = ({ metrics = [] }) => {
  return (
    <div>
      <p className="mb-0.5">{`Summary (${metrics?.length ?? ""})`}</p>
      <p className="text-gray-500 font-light text-xs mb-3">
        Understand how your business is working
      </p>
      <div className="flex flex-wrap gap-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="w-[32.6%]">
            <Insight
              key={metric.metric_name}
              title={metric.metric_label}
              type={ChartTypes.BIGNUMBER}
              metrics={[{ metricKey: metric.metric_name, metricLabel: metric.label }]}
              options={{
                className: "h-48",
                spanCols: ValidSpanColumns.FOUR,
              }}
              filters={{ featureId: metric.featureId }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
