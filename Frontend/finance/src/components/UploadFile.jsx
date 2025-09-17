// src/components/UploadFile.jsx
import React, { useState } from "react";
import api from "../api/api";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("statement", file);

    try {
      setLoading(true);
      const res = await api.post("/transactions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload Bank Statement</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".pdf,.csv,.txt" onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {response && (
        <div>
          <h4>AI Parsed Output (Raw)</h4>
          <pre>{response.parsedData}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
