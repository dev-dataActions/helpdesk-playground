import { Loader } from "@/da-insight-kit/common/Loader";
import React from "react";
import { Chart } from "react-google-charts";
 
export default function GeoChart({data,loading}) {
  if (loading) return <Loader className={"min-h-60"} />;
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
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
}
