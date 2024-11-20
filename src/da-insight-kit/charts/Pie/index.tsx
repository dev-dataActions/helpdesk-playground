import { Loader } from "@/da-insight-kit/common/Loader";
import { customRechartTooltip } from "@/da-insight-kit/utils/customRechartTooltip";
import React from "react";
import {
  PieChart as PChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


 const data2 = [
      {
          "fromtime": "2024-01-01",
          "totime": "2024-06-01",
          "LOL": "234",
          "Dota": "436",
          "Pubg": "769",
      },
  ]

  const newObj=(data)=>{
    const arr=[];
    for(let key in data[0]){
      if(key !== "fromtime" && key !== "totime"){
        const obj ={}
        obj["segment"] = key;
        obj["value"] = data[0][key];
        arr.push(obj);
      }
    }
    return arr;
  }


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}) => {
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

const PieChart = ({ loading, filters }) => {
  if (loading) {
    return <Loader className={"min-h-60"} />;
  }
  return (
    <div className="flex justify-center items-center h-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={240}>
        <PChart width={730} height={}>
          <Tooltip content={customRechartTooltip} />
          <Pie
            data={newObj(data2)}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;