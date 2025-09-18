const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const Transaction = require("../models/Transaction");
const parseTransactionsWithAI = require("../utils/aiParser");

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".txt", ".csv", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type. Only .txt, .csv, and .pdf are allowed"),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const ext = path.extname(req.file.originalname).toLowerCase();

    let fileContent = "";

    if (ext === ".txt") {
      fileContent = fs.readFileSync(filePath, "utf-8");
    } else if (ext === ".csv") {
      fileContent = fs.readFileSync(filePath, "utf-8");
    } else if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(dataBuffer);
      fileContent = parsed.text;
    } else {
      return res.status(400).json({ message: "Unsupported file format" });
    }

    console.log("File content extracted:", fileContent.slice(0, 500));

    const parsedData = await parseTransactionsWithAI(fileContent);

    console.log("AI parsed data:", parsedData);

    // Save each transaction to MongoDB
    for (let transaction of parsedData) {
      const newTransaction = new Transaction(transaction);
      await newTransaction.save();
    }

    res.status(200).json({
      message: "File uploaded and parsed successfully",
      parsedData,
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      message: "Error parsing file",
      error: error.message,
    });
  }
};

// GET all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, description, category, type, merchant } = req.body;

    // Validate required fields
    if (!date || !amount || !description || !category || !type || !merchant) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find and update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { date, amount, description, category, type, merchant },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction updated", updatedTransaction });
  } catch (err) {
    console.error("Error updating transaction:", err);
    res
      .status(500)
      .json({ message: "Failed to update transaction", error: err.message });
  }
};

// DELETE a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the transaction
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res
      .status(500)
      .json({ message: "Failed to delete transaction", error: err.message });
  }
};

module.exports = {
  upload,
  handleFileUpload,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};
