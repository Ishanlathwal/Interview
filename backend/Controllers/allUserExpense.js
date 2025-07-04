const Expense = require("../Schema/expenseSchema");
const User = require("../Schema/userSchema");

exports.getAllUsersExpense = async (req, res) => {
  const aggregation = await Expense.aggregate([
    {
      $group: {
        _id: "$user",
        totalSpent: { $sum: "$amount" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      $unwind: "$userInfo",
    },
    {
      $project: {
        name: "$userInfo.name",
        totalSpent: 1,
      },
    },
  ]);

  res.status(200).json({ success: true, data: aggregation });
};
