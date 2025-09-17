const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Basic route for file upload
app.post("/upload", upload.single("statement"), (req, res) => {
  res.json({ message: "File uploaded successfully!", file: req.file });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
