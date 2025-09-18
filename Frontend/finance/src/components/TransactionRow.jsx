import React, { useState } from "react";
import API from "../api";

const TransactionRow = ({ transaction, onDelete, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ ...transaction });

  const handleSave = async () => {
    try {
      const res = await API.put(`/transactions/${transaction._id}`, formData);
      onUpdate(res.data.updatedTransaction);
      setEdit(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/transactions/${transaction._id}`);
      onDelete(transaction._id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {["date", "amount", "description", "merchant", "category", "type"].map(
        (field) => (
          <td className="px-4 py-2 text-sm" key={field}>
            {edit ? (
              <input
                type={field === "amount" ? "number" : "text"}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              />
            ) : (
              transaction[field]
            )}
          </td>
        )
      )}
      <td className="px-4 py-2 text-sm flex gap-2">
        {edit ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800"
              title="Save"
            >
              💾
            </button>
            <button
              onClick={() => setEdit(false)}
              className="text-gray-500 hover:text-gray-700"
              title="Cancel"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEdit(true)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              🗑️
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;
