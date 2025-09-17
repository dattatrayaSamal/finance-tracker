import React, { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await api.get("/transactions");
      console.log(res);
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Transaction Dashboard</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Merchant</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.date}</td>
              <td>{txn.amount}</td>
              <td>{txn.description}</td>
              <td>{txn.category}</td>
              <td>{txn.type}</td>
              <td>{txn.merchant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
