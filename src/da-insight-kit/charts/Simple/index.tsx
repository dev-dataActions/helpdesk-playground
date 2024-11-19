import { Loader } from "@/da-insight-kit/common/Loader";
import { customRechartTooltip } from "@/da-insight-kit/utils/customRechartTooltip";
import { valueFormatter } from "@/da-insight-kit/utils/general.util";
import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
  Line,
  Area,
} from "recharts";


interface ChartElementConfig {
  dataKey: string;
  color: string;
  size?: number;
  stackId?: string;
  strokeWidth?: number;
  yAxisId?: string;
}

interface ChartsConfig {
  bars?: ChartElementConfig[];
  lines?: ChartElementConfig[];
  areas?: ChartElementConfig[];
}

export interface SimpleChartProps {
  data: any[];
  loading: boolean;
  height?: string;
  width?: string;
  fontSize?: number;
  chartsConfig: ChartsConfig;
  options?: { compactMode?: boolean };
}

const SimpleChart: React.FC<SimpleChartProps> = ({
  data = [],
  loading,
  height = "100%",
  width = "100%",
  fontSize = 12,
  chartsConfig = {},
  options = {},
}) => {
  const { compactMode = false } = options;

  const { filters = {} } = {} as any; 
  const { index = "date" } = filters;

  if (loading) {
    return <Loader className={"h-full"} />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col">
        <div className="flex w-full grow justify-center items-center border border-gray-300 border-dashed rounded-md">
          <p className="text-gray-500 text-sm">No data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-48">
      <ResponsiveContainer width={width} height={height} minHeight={140}>
        <ComposedChart data={data}>
          {!compactMode && (
            <>
              <CartesianGrid stroke="#e7e7e7" vertical={false} horizontal={true} />
              <XAxis
                dataKey={index}
                axisLine={false}
                tickLine={false}
                fontFamily="sans-serif"
                fontSize={fontSize}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontFamily="sans-serif"
                fontSize={fontSize}
                tickFormatter={valueFormatter}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontFamily="sans-serif"
                fontSize={fontSize}
                yAxisId="right"
                orientation="right"
                tickFormatter={valueFormatter}
              />
              <Legend verticalAlign="top" align="right" iconSize={7} iconType="circle" />
            </>
          )}

          <Tooltip content={customRechartTooltip} />

          {chartsConfig.bars?.map((x, idx) => (
            <Bar
              dataKey={x.dataKey}
              barSize={x.size ?? 40}
              fill={x.color}
              key={`bar-${idx}`}
              stackId={x.stackId ?? `stack-${idx}`}
            />
          ))}

          {chartsConfig.lines?.map((x, idx) => (
            <Line
              key={`line-${idx}`}
              type="monotone"
              dataKey={x.dataKey}
              stroke={x.color}
              dot={false}
              strokeWidth={x.strokeWidth ?? 2}
              yAxisId={x.yAxisId}
            />
          ))}

          {chartsConfig.areas?.map((x, idx) => {
            const colorId = `area-gradient-${idx}`;
            return (
              <React.Fragment key={`area-${idx}`}>
                <defs>
                  <linearGradient id={colorId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={x.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Area
                  fill={`url(#${colorId})`}
                  type="monotone"
                  dataKey={x.dataKey}
                  stroke={x.color}
                  dot={false}
                  strokeWidth={x.strokeWidth ?? 2}
                  yAxisId={x.yAxisId}
                />
              </React.Fragment>
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleChart;
