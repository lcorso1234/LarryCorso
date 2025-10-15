import React, { useState } from "react";
import axios from "axios";

export default function Post({ post, onUpdate, onDelete, apiBase }) {
  const [editing, setEditing] = useState(false);
  const [header, setHeader] = useState(post.header);
  const [subheader, setSubheader] = useState(post.subheader);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `${apiBase}/posts/${post.id}`,
        { link: post.link, header, subheader, body },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      onUpdate(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const del = async () => {
    if (!confirm("Delete post?")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${apiBase}/posts/${post.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      onDelete(post.id);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      {editing ? (
        <div>
          <input
            className="w-full p-2 rounded bg-gray-700 mb-2"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-gray-700 mb-2"
            value={subheader}
            onChange={(e) => setSubheader(e.target.value)}
          />
          <textarea
            className="w-full p-2 rounded bg-gray-700 mb-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={save} className="bg-green-600 px-3 py-1 rounded">
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-600 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {post.header && <h3 className="text-xl font-bold">{post.header}</h3>}
          {post.subheader && (
            <p className="text-sm text-gray-300">{post.subheader}</p>
          )}
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: post.embed || "" }}
          />
          <p className="mt-2 text-gray-200">{post.body}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-600 px-3 py-1 rounded"
            >
              Edit
            </button>
            <button onClick={del} className="bg-red-600 px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
