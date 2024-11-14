import { useEffect, useState } from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { ChartMap, ChartTypes } from "../constants/charts.contant";
import { TimeGrain } from "../constants/date.constant";
import { Button } from "../common/Button";
import { Item, PopUpMenu } from "../common/PopUpMenu";
import { Entry } from "../dataResolvers/simple";

export interface InsightMetricFilters {
  dimensionFilters?: {
    dimension: string;
    value: string;
  }[];
  showDimensionContributionIn?: string;
  showDimensionSplitIn?: string;
  compareWith?: string;
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
}

export interface Config {
  [key: string]: string;
}

export interface ChartsConfig {
  stats?: Config[];
  lines?: Config[];
  areas?: Config[];
  bars?: Config[];
}

export interface InsightProps {
  id: string;
  type: ChartTypes;
  title?: string;
  description?: string;
  dataResolver: (filters: InsightFilters | null) => Promise<Entry[]>;
  chartConfigResolver: (filters: InsightFilters | null) => Promise<ChartsConfig>;
  filters?: InsightFilters | null | undefined;
  actions?: Item[];
  options?: InsightOptions;
  className?: string;
  hideCard?: boolean;
}

const getDefaultFilters = (initialFilters: InsightFilters | null | undefined): InsightFilters => ({
  index: initialFilters?.index ?? "date",
  timeRange: initialFilters?.timeRange ?? 90,
  cadence: initialFilters?.cadence ?? TimeGrain.MONTHLY,
  timeGrain: initialFilters?.cadence ?? TimeGrain.MONTHLY,
});

export const Insight: React.FC<InsightProps> = ({
  id,
  type,
  title = "Insight",
  description,
  dataResolver,
  chartConfigResolver,
  filters: _filters,
  actions,
  options = {},
  className,
  hideCard = false,
}) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [filters, setFilters] = useState<InsightFilters | null>(null);
  const [chartsConfig, setChartsConfig] = useState<ChartsConfig | null>(null);
  const [data, setData] = useState<Entry[] | null>(null);
  const Chart = ChartMap[type];

  useEffect(() => setFilters(getDefaultFilters(_filters)), [_filters]);

  useEffect(() => {
    if (!filters) return;
    chartConfigResolver?.(filters).then((config: ChartsConfig) => setChartsConfig(config));
  }, [chartConfigResolver, filters]);

  useEffect(() => {
    if (!filters) return;
    dataResolver?.(filters).then((_data: Entry[]) => setData(_data));
  }, [dataResolver, filters]);

  if (hideCard)
    return (
      <Chart
        chartsConfig={chartsConfig}
        filters={filters}
        data={data}
        loading={!data || !chartsConfig}
        options={options}
      />
    );

  return (
    <div
      key={id}
      className={`w-full h-full flex flex-col justify-between relative border border-gray-200 bg-white rounded-xl ${className}`}
    >
      <div id="chart-header" className="py-2 px-3 border-b" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <p className="text-sm text-left text-nowrap overflow-x-scroll no-scrollbar max-w-[70%]">
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
