import React from "react";
import TransactionRow from "./TransactionRow";

const TransactionTable = ({ transactions, onDelete, onUpdate }) => {
  return (
    <div className="mt-8 overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-50 text-blue-900">
          <tr>
            {[
              "Date",
              "Amount",
              "Description",
              "Merchant",
              "Category",
              "Type",
              "Actions",
            ].map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold border-b"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <TransactionRow
                key={t._id}
                transaction={t}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
