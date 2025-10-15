import React, { useState } from "react";
import axios from "axios";

export default function Login({ apiBase, onLogin }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/auth/login`, {
        username,
        password,
      });
      onLogin(res.data.token);
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-gray-800 p-4 rounded mb-4">
      <div className="mb-2">
        <input
          className="w-full p-2 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="bg-green-600 px-4 py-2 rounded">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
