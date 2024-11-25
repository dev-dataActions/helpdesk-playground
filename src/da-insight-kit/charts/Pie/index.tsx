import { Loader } from "@/da-insight-kit/common/Loader";
import { ColorPalette } from "@/da-insight-kit/constants/colors.constants";
import { customRechartTooltip } from "@/da-insight-kit/utils/customRechartTooltip";
import React from "react";
import { PieChart as PChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = Object.values(ColorPalette);

const PieChart = ({ data, chartsConfig, loading }) => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={6}
      >
        {data[index].segment}
      </text>
    );
  };

  if (loading) {
    return <Loader className={"min-h-60"} />;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PChart>
          <Tooltip content={customRechartTooltip} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey={chartsConfig.value}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
