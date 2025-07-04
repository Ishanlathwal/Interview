const express = require("express");
const {
  registerUser,
  registerUserMain,
  loginUser,
  logoutUser,
  getUserDetails,
} = require("../Controllers/userAuth");
const {
  protectRoutes,
  authorizeRole,
} = require("../middleware/authentication_isUSerLoggedIn");
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  temp,
} = require("../Controllers/expenses");
const {
  setBudget,
  getBudgetAlerts,
  getBudget,
  deleteBudget,
} = require("../Controllers/budget");
const { getAllUsersExpense } = require("../Controllers/allUserExpense");
const { getDashboarddata } = require("../Controllers/dashboard");

const router = express.Router();

router.route("/signup").post(registerUserMain);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(protectRoutes, getUserDetails);

/// Expense routes

router.route("/temp").get(temp);

router
  .route("/expense")
  .get(protectRoutes, getExpenses)
  .post(protectRoutes, createExpense);

router.route("/dashboard").get(protectRoutes, getDashboarddata);

router
  .route("/expense/:id")
  .patch(protectRoutes, updateExpense)
  .delete(protectRoutes, deleteExpense);

// Budget routes
router.route("/getBudget").get(protectRoutes, getBudget);
router.route("/deletebudget/:id").delete(protectRoutes, deleteBudget);
router.route("/set").post(protectRoutes, setBudget);
router.route("/alerts").get(protectRoutes, getBudgetAlerts);

// Admin route

router
  .route("/admin/expenses")
  .get(protectRoutes, authorizeRole("admin"), getAllUsersExpense);

module.exports = router;
