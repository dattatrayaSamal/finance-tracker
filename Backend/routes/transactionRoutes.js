const express = require("express");
const router = express.Router();
const {
  upload,
  handleFileUpload,
  getAllTransactions,
} = require("../controllers/transactionController");

router.post("/upload", upload.single("statement"), handleFileUpload);

router.get("/", getAllTransactions);

module.exports = router;
