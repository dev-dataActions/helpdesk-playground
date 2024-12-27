import { Loader } from "@/da-insight-kit/common/Loader";
import React from "react";
import { Chart } from "react-google-charts";

interface GeoChartProps {
  data: [string, string | number][];
  loading: boolean;
}

const GeoChart: React.FC<GeoChartProps> = ({ data, loading }) => {
  if (loading) return <Loader className="min-h-60" />;

  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            if (!chartWrapper) return;
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={data}
    />
  );
};

export default GeoChart;
