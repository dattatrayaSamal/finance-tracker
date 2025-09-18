import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import TransactionTable from "../components/TransactionTable";
import SummaryCards from "../components/SummaryCards";
import API from "../api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleUploadComplete = (newData) => {
    setTransactions((prev) => [...prev, ...newData]);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  const handleUpdate = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t._id === updatedTransaction._id ? updatedTransaction : t
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        Finance Tracker
      </h1>

      <FileUpload onUploadComplete={handleUploadComplete} />
      <SummaryCards transactions={transactions} />
      <TransactionTable
        transactions={transactions}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Dashboard;
