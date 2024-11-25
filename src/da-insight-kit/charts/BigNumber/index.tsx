import React from "react";
import { getChange, getSum, valueFormatter } from "../../utils/general.util";
import { CompactBigNumber } from "./components/CompactBigNumber";
import { getCurrLabel } from "./utils/bigNumber.util";
import { Loader } from "../../common/Loader";
import { ExpandedBigNumber } from "./components/ExpandedBigNumber";
import { TimeGrainAPIKey } from "../../constants/date.constant";
import { Change } from "./components/Change";
import { Entry } from "@/da-insight-kit/resolvers/dataResolvers/simple";
import { ChartsConfig, InsightFilters, InsightOptions } from "@/da-insight-kit/components/Insight";

export interface BigNumberProps {
  data: Entry[];
  loading?: boolean;
  filters?: InsightFilters | null;
  chartsConfig?: ChartsConfig;
  options?: InsightOptions;
}

const BigNumber: React.FC<BigNumberProps> = ({
  data,
  loading = false,
  filters = {},
  chartsConfig = {},
  options = {},
}) => {
  const timeGrain = filters?.timeGrain;
  const { compact, expanded } = options;

  if (loading) {
    return <Loader className="h-full" />;
  }

  if (!timeGrain || !chartsConfig?.stats?.[0] || data?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-gray-500 text-sm">No data</p>
      </div>
    );
  }

  const metricLabel = chartsConfig.stats[0].name;
  const metricCurrValue = getSum(data[data.length - 1], [metricLabel]);
  const metricPrevValue = getSum(data[data.length - 2], [metricLabel]);
  const metricChange = getChange(data, [metricLabel]);
  const metricChangeType = metricChange > 0 ? "positive" : "negative";

  if (compact)
    return (
      <CompactBigNumber
        number={valueFormatter(metricCurrValue)}
        label={metricLabel}
        hideLabel={options?.hideTitle}
      />
    );

  if (expanded)
    return (
      <ExpandedBigNumber
        data={data}
        value={metricCurrValue}
        prevValue={metricPrevValue}
        change={metricChange}
        changeType={metricChangeType}
        timeGrain={timeGrain}
      />
    );

  return (
    <div className="h-full items-center p-3 flex flex-col gap-1 justify-center">
      <div className="flex flex-col items-start text-gray-900 gap-y-1">
        <p className="inline-block px-1.5 text-[11px] border border-gray-300 font-light rounded-md text-gray-600">
          {getCurrLabel(data, timeGrain)}
        </p>
        <p className="text-5xl font-medium text-gray-700"> {valueFormatter(metricCurrValue)}</p>
      </div>
      <div className="flex justify-center items-center gap-1">
        <Change change={metricChange} changeType={metricChangeType} />
        <span className="text-sm font-light">{`vs last ${TimeGrainAPIKey[timeGrain]}`}</span>
      </div>
    </div>
  );
};

export default BigNumber;
