// import React from "react";

// const Budget = () => {
//   return <div>Budget</div>;
// };

// export default Budget;

import { useEffect, useState } from "react";
import axiosInstance from "../../../baseUrl";
import { FaTrashAlt } from "react-icons/fa";

export default function Budget() {
  const [budget, setBudget] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
  });
  const [alert, setAlert] = useState([]);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBudget();
    budgetAlert();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axiosInstance.delete(`/deletebudget/${id}`);
    budgetAlert();
    fetchBudget();
  };

  const budgetAlert = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/alerts", {
        withCredentials: true,
      });

      setAlert(response.data.alerts || []);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudget = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getBudget", {
        withCredentials: true,
      });
      console.log(response);
      setBudget(response.data.budget || []);
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
      await axiosInstance.post("/set", formData, {
        withCredentials: true,
      });
      setFormData({ category: "", limit: "" });
      budgetAlert();
      fetchBudget();
    } catch (error) {
      console.error("Failed to create expense:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Budget</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-gray-700">Limit</label>
                <input
                  type="number"
                  name="limit"
                  value={formData.limit}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={creating}
              >
                {creating ? "Saving..." : "Add Budget"}
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Budget</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : budget.length === 0 ? (
              <p className="text-gray-500">No budget found.</p>
            ) : (
              <ul className="space-y-4">
                {budget.map((budget) => (
                  <li
                    key={budget._id}
                    className="border p-4 rounded-md bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-lg">{budget.category}</p>
                      <p className="text-gray-600 text-sm capitalize">
                        {budget.month}
                      </p>
                    </div>
                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {budget.limit}
                    </span>
                    <button onClick={(e) => handleDelete(e, budget._id)}>
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Alerts</h2>

            {alert.length === 0 ? (
              <p className="text-gray-500">No alerts at the moment.</p>
            ) : (
              alert.map((item) => {
                let styles = {
                  bgColor: "",
                  textColor: "",
                  borderColor: "",
                  icon: "",
                };

                if (item.warningLevel === "danger") {
                  styles = {
                    bgColor: "bg-red-100",
                    textColor: "text-red-700",
                    borderColor: "border-red-500",
                    icon: "⛔",
                  };
                } else if (item.warningLevel === "warning") {
                  styles = {
                    bgColor: "bg-yellow-100",
                    textColor: "text-yellow-800",
                    borderColor: "border-yellow-500",
                    icon: "⚠️",
                  };
                }

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-l-4 shadow-sm ${styles.bgColor} ${styles.borderColor}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl">{styles.icon}</div>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${styles.textColor}`}
                        >
                          {item.warningLevel === "danger"
                            ? "Critical Budget Breach"
                            : "Budget Warning"}{" "}
                          – {item.category}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          You've spent <strong>₹{item.spent}</strong> out of
                          your <strong>₹{item.limit}</strong> budget (
                          <strong>{item.percent}%</strong>).
                        </p>
                        <p className="text-sm mt-1 italic">
                          Status:{" "}
                          <strong>{item.warningLevel.toUpperCase()}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
