const { isValidObjectId, Types } = require("mongoose");
const Budget = require("../Schema/budgetSchema");
const Expense = require("../Schema/expenseSchema");
const catchAsyncError = require("../utils/Error-Handeling/Catch_Async-Errors");

exports.getDashboarddata = catchAsyncError(async (req, res) => {
  const userId = req.user.id;
  const userObjectId = new Types.ObjectId(String(userId));
});
