import React, { useState } from "react";
import API from "../api";

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("statement", file);

    try {
      setLoading(true);
      const res = await API.post("/transactions/upload", formData);
      onUploadComplete(res.data.parsedData);
      setFile(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <input
        type="file"
        accept=".pdf,.csv,.txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Statement"}
      </button>
    </div>
  );
};

export default FileUpload;
