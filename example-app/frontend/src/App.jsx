import React, { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import Login from "./components/Login";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken("");
  };

  const handleCreate = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const handleUpdate = (updated) => {
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Example Posts</h1>
        <PostForm onCreate={handleCreate} apiBase={API_BASE} />
        {!authToken ? (
          <Login apiBase={API_BASE} onLogin={handleLogin} />
        ) : (
          <div className="flex items-center justify-between mb-4">
            <PostForm onCreate={handleCreate} apiBase={API_BASE} />
            <button
              onClick={handleLogout}
              className="ml-4 bg-gray-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6 mt-6">
            {posts.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              posts.map((p) => (
                <Post
                  key={p.id}
                  post={p}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  apiBase={API_BASE}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
