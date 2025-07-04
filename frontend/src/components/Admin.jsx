import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseUrl";

const Admin = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosInstance.get("/admin/expenses");
        setExpenses(response.data.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin All Expenses</h1>

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-6">{error}</div>
      ) : expenses.length === 0 ? (
        <div className="text-center text-gray-400 py-6">No expenses found.</div>
      ) : (
        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr
                  key={expense._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{expense.name}</td>
                  <td className="px-6 py-4 capitalize">
                    ₹ {expense.totalSpent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
