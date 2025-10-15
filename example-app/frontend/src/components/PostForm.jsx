import React, { useState } from "react";
import axios from "axios";

export default function PostForm({ onCreate, apiBase }) {
  const [link, setLink] = useState("");
  const [header, setHeader] = useState("");
  const [subheader, setSubheader] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!header) return alert("Header required");
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${apiBase}/posts`,
        { link, header, subheader, body },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      onCreate(res.data);
      setLink("");
      setHeader("");
      setSubheader("");
      setBody("");
    } catch (err) {
      console.error("Create failed", err);
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-gray-800 p-4 rounded">
      <div className="mb-2">
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Link (YouTube or Spotify)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Subheader"
          value={subheader}
          onChange={(e) => setSubheader(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <textarea
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Post"}
      </button>
    </form>
  );
}
