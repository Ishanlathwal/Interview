import { useEffect, useState } from "react";
import axiosInstance from "../../../baseUrl";
import { FaTrashAlt } from "react-icons/fa";
import { Slider } from "@mui/material";

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    paymentMethod: "upi",
  });

  const [amount, setAmount] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [filterData, setFilterData] = useState("");

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // Fetch expenses on mount
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await axiosInstance.post("/expense", formData, {
        withCredentials: true,
      });
      setFormData({ amount: "", category: "", paymentMethod: "upi" });
      fetchExpenses();
    } catch (error) {
      console.error("Failed to create expense:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axiosInstance.delete(`/expense/${id}`);
    fetchExpenses();
  };
  const priceHandler = (event, newPrice) => {
    setAmount(newPrice);
  };

  const filter = async () => {
    try {
      setLoading(true);

      const params = [];

      if (category.trim()) {
        params.push(`keyword=${category.trim()}`);
      }

      if (amount[0] !== 0) {
        params.push(`amount[gte]=${amount[0]}`);
      }
      if (amount[1] !== 25000) {
        params.push(`amount[lte]=${amount[1]}`);
      }

      if (filterData.trim()) {
        params.push(`paymentMethod=${filterData.trim()}`);
      }

      const query = params.join("&");
      console.log("query: ", query);

      const response = await axiosInstance.get(`/expense?${query}`, {
        withCredentials: true,
      });

      setExpenses(response.data.expense || []);
    } catch (error) {
      console.error("Failed to filter expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <div className="text-2xl ml-9">Amount</div>
          <Slider
            value={amount}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
            style={{ width: "10vmax" }}
          />
        </div>
        <div>
          <div htmlFor="" className="text-2xl  ml-9">
            Category
          </div>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Payment Method</label>
          <select
            name="paymentMethod"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value=""></option>
            <option value="upi">UPI</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
      </div>
      <button
        onClick={filter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Filter
      </button>

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={creating}
              >
                {creating ? "Saving..." : "Add Expense"}
              </button>
            </form>
          </div>

          {/* Expense List */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : expenses.length === 0 ? (
              <p className="text-gray-500">No expenses found.</p>
            ) : (
              <ul className="space-y-4">
                {expenses.map((expense) => (
                  <li
                    key={expense._id}
                    className="border p-4 rounded-md bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-lg">
                        ₹ {expense.amount}
                      </p>
                      <p className="text-gray-600 text-sm capitalize">
                        {expense.category}
                      </p>
                    </div>
                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {expense.paymentMethod}
                    </span>
                    <button onClick={(e) => handleDelete(e, expense._id)}>
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
