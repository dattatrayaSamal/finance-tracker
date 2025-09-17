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

    const parsedData = await parseTransactionsWithAI(fileContent);

    const newTransaction = new Transaction({
      date: "2023-10-01",
      amount: 100.0,
      description: "Test Transaction",
      category: "Food",
      type: "expense",
      merchant: "Supermarket",
    });

    await newTransaction.save();

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

module.exports = {
  upload,
  handleFileUpload,
  getAllTransactions,
};
