import React, { memo } from "react";
import { ComposedChart, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";
import uniqid from "uniqid";
import { Loader } from "../../common/Loader";
import { getChange, getSum } from "../../utils/general.util";
import { Stat } from "../BigNumber/components/Stat";
import { TimeGrainAPIKey } from "../../constants/date.constant";
import { customRechartTooltip } from "../../utils/customRechartTooltip";

const BigNumberWithTrend = memo(function BigNumberWithTrend({
  data,
  loading,
  filters,
  height = "100%",
  width = "100%",
  chartsConfig = {},
}) {
  if (loading) {
    return <Loader className="min-h-32 h-full" />;
  }

  if (data?.length === 0) {
    return (
      <div className="w-full flex-grow min-h-32 h-full p-2">
        <div className="flex w-full h-full justify-center items-center border border-gray-300 border-2 border-dashed rounded-md">
          <p className="text-gray-500">No data</p>
        </div>
      </div>
    );
  }

  const metricLabel = chartsConfig?.stats?.[0]?.name;
  const metricChange = getChange(data, [metricLabel]);

  return (
    <div className="h-32 flex flex-col justify-between h-full">
      <div className="p-3 text-left">
        <Stat
          value={getSum(data[data.length - 1], [metricLabel]).toFixed(3)}
          change={`${metricChange}%`}
          changeType={metricChange > 0 ? "positive" : "negative"}
          interval={`last ${TimeGrainAPIKey[filters.timeGrain]}`}
          prevValue={getSum(data[data.length - 2], [metricLabel]).toFixed(3)}
        />
      </div>

      <ResponsiveContainer width={width} height={height}>
        <ComposedChart data={data}>
          <CartesianGrid
            stroke="#e7e7e7"
            vertical={false}
            horizontal={chartsConfig?.stats?.length === 0}
          />
          <Tooltip content={customRechartTooltip} />
          {chartsConfig.areas?.map((x) => {
            const colorId = uniqid();
            return (
              <>
                <defs>
                  <linearGradient id={colorId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={x.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Area
                  key={colorId}
                  fill={`url(#${colorId})`}
                  type="monotone"
                  dataKey={x.dataKey}
                  stroke={x.color}
                  dot={false}
                  strokeWidth={x.strokeWidth ?? 2}
                  yAxisId={x.yAxisId}
                />
              </>
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
});

export default BigNumberWithTrend;
