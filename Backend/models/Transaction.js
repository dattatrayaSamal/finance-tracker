const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: String,
  amount: Number,
  description: String,
  category: String,
  type: String, // e.g. income, expense, transfer
  merchant: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
