const express = require("express");
const router = express.Router();
const {
  upload,
  handleFileUpload,
} = require("../controllers/transactionController");

router.post("/upload", upload.single("statement"), handleFileUpload);

module.exports = router;
