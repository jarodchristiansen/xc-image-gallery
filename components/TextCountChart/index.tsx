import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
        <ResponsiveContainer width="100%" height={500} className="mx-auto">
          <PieChart>
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
              {data?.data.map((entry: any, index: number) => {
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
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TextCountChart;
