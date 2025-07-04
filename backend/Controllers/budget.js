const Budget = require("../Schema/budgetSchema");
const Expense = require("../Schema/expenseSchema");
const moment = require("moment");

exports.setBudget = async (req, res) => {
  const { category, limit } = req.body;
  const month = moment().format("YYYY-MM");

  const existing = await Budget.findOne({
    user: req.user._id,
    category,
    month,
  });

  if (existing) {
    existing.limit = limit;
    await existing.save();
    return res.status(200).json({ success: true, message: "Budget updated." });
  }

  await Budget.create({ user: req.user._id, category, month, limit });

  res.status(201).json({ success: true, message: "Budget set." });
};

exports.getBudget = async (req, res) => {
  const budget = await Budget.find({ user: req.user._id });
  res.status(200).json({ success: true, budget });
};

exports.getBudgetAlerts = async (req, res) => {
  const month = moment().format("YYYY-MM");

  const budgets = await Budget.find({ user: req.user._id, month });

  const alerts = [];

  for (const b of budgets) {
    const monthStart = moment(month).startOf("month").toDate();
    const monthEnd = moment(month).endOf("month").toDate();

    const totalSpent = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          category: b.category,
          createdAt: { $gte: monthStart, $lte: monthEnd },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const spent = totalSpent[0]?.total || 0;
    const percent = (spent / b.limit) * 100;
    console.log("b", b);
    if (percent >= 80) {
      alerts.push({
        id: b._id,
        category: b.category,
        limit: b.limit,
        spent,
        percent,
        warningLevel: percent >= 100 ? "danger" : "warning",
      });
    }
  }

  res.status(200).json({ success: true, alerts });
};

exports.deleteBudget = async (req, res, next) => {
  await Budget.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
  });
};
