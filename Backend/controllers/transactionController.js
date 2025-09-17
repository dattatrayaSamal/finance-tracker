const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Transaction = require("../models/Transaction");
const parseTransactionsWithAI = require("../utils/aiParser");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const handleFileUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const fileContent = fs.readFileSync(filePath, "utf-8"); // Reading the file content

    const parsedData = await parseTransactionsWithAI(fileContent);

    // Here we would process the parsedData and save it to MongoDB
    const newTransaction = new Transaction({
      date: "2023-10-01",
      amount: 100.0,
      description: "Test Transaction",
      category: "Food",
      type: "expense",
      merchant: "Supermarket",
    });

    await newTransaction.save();

    res.json({
      message: "File uploaded and parsed successfully",
      parsedData,
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ message: "Error parsing file" });
  }
};

module.exports = {
  upload,
  handleFileUpload,
};
