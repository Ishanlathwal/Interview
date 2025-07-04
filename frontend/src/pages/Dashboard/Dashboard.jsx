import React, { useEffect, useState } from "react";
import axiosInstance from "../../../baseUrl";
import Loader from "../../components/Loader/Loader";

import SpendingPieChart from "../../components/layouts/Piechart";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/expense", {
        withCredentials: true,
      });
      setExpenses(response.data.expense || []);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalExpense =
    expenses && expenses.reduce((acc, item) => acc + item.amount, 0);

  const categoryTotals = {};

  expenses.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + item.amount;
  });

  const topCategory = Object.entries(categoryTotals)?.reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["", 0]
  );

  const methodCounts = {};

  expenses.forEach((item) => {
    methodCounts[item.paymentMethod] =
      (methodCounts[item.paymentMethod] || 0) + 1;
  });

  const top3Methods = Object.entries(methodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((entry) => {
      return { method: entry[0], count: entry[1] };
    });

  const categoryWise = {};

  expenses.forEach((item) => {
    categoryWise[item.category] =
      (categoryWise[item.category] || 0) + item.amount;
  });

  const categoryWiseSpending = Object.entries(categoryWise).map(
    ([category, total]) => ({ category, total })
  );
  console.log(categoryWiseSpending);
  if (loading) return <Loader />;

  return (
    <>
      <h2 className="font-bold text-2xl">Total money spent = {totalExpense}</h2>
      <h2 className="font-bold text-2xl">
        Top category ={" "}
        <span className="text-amber-500">
          {topCategory[0]} <br />
        </span>
        Amount spent = <span className="text-amber-500"> {topCategory[1]}</span>
      </h2>
      <div className="flex flex-wrap gap-6 p-4 ">
        <div className="flex-1 min-w-[320px] rounded-lg shadow border bg-white">
          <h2 className="text-lg font-semibold px-6 py-4 border-b">
            Top Payment Methods
          </h2>
          {top3Methods.length > 0 ? (
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Method</th>
                  <th className="px-6 py-3 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                {top3Methods.map((item, index) => (
                  <tr key={item.method} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.method}</td>
                    <td className="px-6 py-4">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 font-semibold text-center">
                No expenses found please add an expense.
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[320px] rounded-lg shadow border bg-white">
          <h2 className="text-lg font-semibold px-6 py-4 border-b">
            Category wise spending
          </h2>
          {categoryWiseSpending.length > 0 ? (
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {categoryWiseSpending.map((item, index) => (
                  <tr key={item.name} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 font-semibold text-center">
                No expenses found please add an expense.
              </p>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-[320px] rounded-lg shadow border bg-white">
          <SpendingPieChart data={categoryWiseSpending} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
