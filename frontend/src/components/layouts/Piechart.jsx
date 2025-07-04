import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // 100–255
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r}, ${g}, ${b})`;
};

const SpendingPieChart = ({ data }) => {
  const categoryColorMap = useMemo(() => {
    const map = {};
    data.forEach((item) => {
      if (!map[item.category]) {
        map[item.category] = getRandomColor();
      }
    });
    return map;
  }, [data]);

  return (
    <div className="w-full h-110 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Category-wise Spending</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category, total }) => `${category}: ₹${total}`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColorMap[entry.category]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹ ${value}`} />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 font-semibold text-center">
            No expenses found please add an expense.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpendingPieChart;
