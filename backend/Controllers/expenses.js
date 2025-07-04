const catchAsyncError = require("../utils/Error-Handeling/Catch_Async-Errors");
const Expense = require("../Schema/expenseSchema");
const APIFeatures = require("../utils/api-features-filter-sort-pagination/apiFeature");
const AppError = require("../utils/Error-Handeling/Error-Handeling_Class");

exports.createExpense = catchAsyncError(async (req, res, next) => {
  const { amount, category, paymentMethod, notes } = req.body;
  const expense = await Expense.create({
    amount,
    category,
    paymentMethod,
    notes,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    expense,
  });
});

exports.temp = async (req, res) => {
  const data = await Expense.find();
  res.status(200).json({ success: true, data });
};

exports.getExpenses = catchAsyncError(async (req, res, next) => {
  const features = new APIFeatures(
    Expense.find({ user: req.user._id }),
    req.query
  )
    .search()
    .filter();

  const expense = await features.query;

  res.status(200).json({ success: true, result: expense.length, expense });
});

exports.updateExpense = catchAsyncError(async (req, res, next) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!expense) {
    return next(new AppError(`No expense found with that id`, 404));
  }

  res.status(201).json({
    status: "success",
    data: { expense },
  });
});

exports.deleteExpense = catchAsyncError(async (req, res, next) => {
  console.log(req.params.id);
  await Expense.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
  });
});
