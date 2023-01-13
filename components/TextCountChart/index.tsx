import {
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useMemo } from "react";

const TextCountChart = (data: any) =>
  // { data, sum }: UserHoldingsPieChartProps
  {
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
      <div className="min-w-full">
        <div>
          <h2>Text Counts</h2>

          {/* <span className="total-span">Total - {currencyFormat(sum)}</span> */}

          <div className="min-w-full">
            {data.data.length && (
              // <ResponsiveContainer width={600} height={600}>
              <PieChart width={500} height={500}>
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
              // </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    );
  };

// const ChartContainer = styled.div`
//   border: 1px solid black;
//   border-radius: 10px;
//   padding: 1rem 1rem;
//   background-color: white;
//   box-shadow: 2px 4px 8px lightgray;
//   text-align: center;

//   h1,
//   .total-span {
//     font-weight: bold;
//   }
// `;

export default TextCountChart;
