import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { TextResult } from "../../types";

/**
 *
 * @param data: array of {word: string, count: number} to indicate word/count for most used words
 * @returns Recharts PieChart returning the 10 most frequently used words on the page.
 */

interface TextCountChartProps {
  data: CountItem[];
}

interface CountItem {
  word: string;
  count: number;
}

const TextCountChart = (data: TextCountChartProps) => {
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
      {!!data?.data?.length && (
        <PieChart width={400} height={400} className="mx-auto">
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
            {data.data.map((entry: TextResult, index: number) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default TextCountChart;
