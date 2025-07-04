const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "please enter amount"],
    },
    category: {
      type: String,
      required: [true, "please enter category"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    paymentMethod: {
      type: String,
      required: [true, "please enter payment method"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
