const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const transactionRoutes = require("./routes/transactionRoutes");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use transaction routes
app.use("/api/transactions", transactionRoutes);

// Static folder for uploaded files (optional, if you need to access them directly)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
