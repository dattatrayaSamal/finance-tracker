const express = require("express");
const router = express.Router();
const {
  upload,
  handleFileUpload,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/upload", upload.single("statement"), handleFileUpload);

router.get("/", getAllTransactions);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;
