import {
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useMemo } from "react";

const TextCountChart = (data: any) => {
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <div>
      {data.data.length && (
        <PieChart width={500} height={500} className="mx-auto">
          <Pie
            data={data.data}
            color="#000000"
            dataKey="count"
            nameKey="word"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
          >
            {data.data.map((entry: any, index: number) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Pie>
          <Tooltip
          //   content={CustomToolTip}
          />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default TextCountChart;
