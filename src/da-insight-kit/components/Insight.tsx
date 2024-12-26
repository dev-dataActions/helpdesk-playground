import { useCallback, useEffect, useState } from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { ChartMap, ChartTypes } from "../constants/charts.contant";
import { TimeGrain } from "../constants/date.constant";
import { Button } from "../common/Button";
import { Item, PopUpMenu } from "../common/PopUpMenu";
import { Metric } from "../utils/insight.util";
import { Entry } from "../resolvers/dataResolvers/simple";
import { ChartDataResolverMap } from "../resolvers/dataResolvers/constants/dataResolvers.constant";
import { ChartConfigResolverMap } from "../resolvers/chartConfigResolvers/constants/chartConfigResolvers.contant";
import { SegmentEntry } from "../resolvers/dataResolvers/pieDataResolver";

export interface InsightMetricFilters {
  dimensionFilters?: {
    dimension: string;
    value: string;
  }[];
  showDimensionContributionIn?: string;
  showDimensionSplitIn?: string;
  compareWith?: string[];
  showPivotIn?: {
    row: string;
    column: string;
  };
}

export interface InsightFilters {
  index?: string;
  timeRange?: number;
  cadence?: TimeGrain;
  timeGrain?: TimeGrain;
  [key: string]: InsightMetricFilters | string | number | TimeGrain | undefined;
}

export interface InsightOptions {
  compact?: boolean;
  expanded?: boolean;
  hideTitle?: boolean;
}

export interface Config {
  [key: string]: string;
}

export interface ChartsConfig {
  stats?: Config[];
  lines?: Config[];
  areas?: Config[];
  bars?: Config[];
  pie?: Config;
  pivot?: Config;
}

export enum ValidSpanColumns {
  ONE = "col-span-1",
  TWO = "col-span-2",
  THREE = "col-span-3",
  FOUR = "col-span-4",
  SIX = "col-span-6",
  TWELVE = "col-span-12",
}

export interface InsightProps {
  workspaceId: string;
  type: ChartTypes | string;
  metrics: Metric[];
  title?: string;
  description?: string;
  dataResolver?: (filters: InsightFilters | null) => Promise<Entry[]>;
  chartConfigResolver?: (
    filters: InsightFilters | null
  ) => Promise<ChartsConfig>;
  filters?: InsightFilters | null | undefined;
  actions?: Item[];
  options?: InsightOptions;
  className?: string;
  hideCard?: boolean;
  spanCols?: ValidSpanColumns;
  onClick?: () => void;
}

const getDefaultFilters = (
  initialFilters: InsightFilters | null | undefined
): InsightFilters => ({
  index: initialFilters?.index ?? "date",
  timeRange: initialFilters?.timeRange ?? 90,
  cadence: initialFilters?.cadence ?? TimeGrain.MONTHLY,
  timeGrain: initialFilters?.timeGrain ?? TimeGrain.MONTHLY,
  ...initialFilters,
});

export const Insight: React.FC<InsightProps> = ({
  workspaceId,
  type,
  metrics,
  title = "Insight",
  description,
  dataResolver,
  chartConfigResolver,
  filters: _filters,
  actions,
  options = {},
  className,
  hideCard = false,
  spanCols,
  onClick,
}) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [filters, setFilters] = useState<InsightFilters | null>(null);
  const [chartsConfig, setChartsConfig] = useState<ChartsConfig | null>(null);
  const [data, setData] = useState<Entry[] | SegmentEntry[] | null>(null);
  const Chart = ChartMap[type];

  const defaultDataResolver = useCallback(
    (filters: InsightFilters | null): Promise<Entry[] | SegmentEntry[]> =>
      ChartDataResolverMap[type]?.(metrics, filters, workspaceId),
    [metrics, type, workspaceId]
  );

  const defaultChartConfigResolver = useCallback(
    (filters: InsightFilters | null): Promise<ChartsConfig> =>
      ChartConfigResolverMap[type]?.(metrics, filters),
    [metrics, type]
  );

  useEffect(() => setFilters(getDefaultFilters(_filters)), [_filters]);

  useEffect(() => {
    if (!filters) return;
    (chartConfigResolver ?? defaultChartConfigResolver)(filters).then(
      (config: ChartsConfig) => setChartsConfig(config)
    );
  }, [chartConfigResolver, defaultChartConfigResolver, filters]);

  useEffect(() => {
    if (!filters) return;
    (dataResolver ?? defaultDataResolver)(filters)?.then(
      (_data: Entry[] | SegmentEntry[]) => setData(_data)
    );
  }, [dataResolver, defaultDataResolver, filters]);

  if (hideCard)
    return (
      <div className={`${spanCols} ${className}`}>
        <Chart
          chartsConfig={chartsConfig}
          filters={filters}
          data={data}
          loading={!data || !chartsConfig}
          options={options}
        />
      </div>
    );

  return (
    <div
      className={`w-full flex flex-col justify-between relative border border-gray-200 bg-white rounded-xl ${className} ${spanCols}`}
    >
      <div id="chart-header" className="py-2 px-3 border-b">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <p
            className="text-sm text-left text-nowrap overflow-x-auto no-scrollbar max-w-[70%] hover:underline cursor-pointer"
            onClick={onClick}
          >
            {title}
          </p>
          <div className="flex-grow flex items-center justify-end gap-x-2">
            {description && (
              <Button
                className="cursor-pointer !w-auto !p-0 !m-0 shadow-transparent rounded-none"
                onClick={() => setShowDescription(!showDescription)}
                label={<TfiInfoAlt size={14} />}
              />
            )}
            {actions && actions.length > 0 && (
              <PopUpMenu
                label={<PiDotsThreeVerticalBold size={16} aria-hidden="true" />}
                menuItems={actions}
              />
            )}
          </div>
        </div>
      </div>

      <div id="chart-body" className="flex-grow cursor-pointer relative">
        <div
          className={`${
            showDescription ? `max-h-full border-b` : `max-h-0`
          } transition-all duration-500 absolute overflow-hidden left-0 top-0 bg-white w-full z-10`}
        >
          <p className="text-xxs h-full text-gray-500 font-sans text-left px-3 py-1">
            {description}
          </p>
        </div>

        <Chart
          chartsConfig={chartsConfig}
          filters={filters}
          data={data}
          loading={!data || !chartsConfig}
          options={options}
        />
      </div>
    </div>
  );
};
