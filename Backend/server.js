const express = require("express");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();
// Use transaction routes
app.use("/api/transactions", transactionRoutes);

// Static folder for uploaded files (optional, if you need to access them directly)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
