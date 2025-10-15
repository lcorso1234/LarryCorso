/*
  Simple Express backend serving posts stored in a local JSON file.
  Routes:
    GET /posts
    POST /posts
    PUT /posts/:id
    DELETE /posts/:id
*/

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, "data", "posts.json");

const JWT_SECRET = process.env.JWT_SECRET || "example-secret-key";
const AUTH_USER = process.env.AUTH_USER || "admin";
const AUTH_PASS = process.env.AUTH_PASS || "password123";

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Ensure data directory and file exist
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(DATA_FILE))
  fs.writeFileSync(DATA_FILE, JSON.stringify({ posts: [] }, null, 2));

function readData() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Helper: embed links for YouTube or Spotify
function getEmbedHtml(link) {
  if (!link) return null;
  // YouTube
  const yt = link.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt)
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen></iframe>`;

  // Spotify (episode/track/show)
  const sp = link.match(/open\.spotify\.com\/(episode|track|show)\/([\w-]+)/);
  if (sp)
    return `<iframe src="https://open.spotify.com/embed/${sp[1]}/${sp[2]}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;

  return null;
}

// GET all posts
app.get("/posts", (req, res) => {
  const data = readData();
  res.json(data.posts);
});

// POST create new post
// Authentication route - returns a JWT token
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username and password required" });

  if (username !== AUTH_USER || password !== AUTH_PASS) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

// Auth middleware for protected routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

app.post("/posts", authenticateToken, (req, res) => {
  const { link, header, subheader, body } = req.body;
  if (!header) return res.status(400).json({ error: "header required" });

  const data = readData();
  const post = {
    id: nanoid(),
    link: link || null,
    embed: getEmbedHtml(link),
    header,
    subheader: subheader || null,
    body: body || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.posts.unshift(post);
  writeData(data);
  res.status(201).json(post);
});

// PUT edit a post
app.put("/posts/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const { link, header, subheader, body } = req.body;
  const data = readData();
  const idx = data.posts.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });

  const post = data.posts[idx];
  post.link = link || post.link;
  post.embed = getEmbedHtml(post.link);
  post.header = header || post.header;
  post.subheader = subheader || post.subheader;
  post.body = body || post.body;
  post.updatedAt = new Date().toISOString();

  data.posts[idx] = post;
  writeData(data);
  res.json(post);
});

// DELETE a post
app.delete("/posts/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const data = readData();
  const idx = data.posts.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });

  const [deleted] = data.posts.splice(idx, 1);
  writeData(data);
  res.json({ success: true, deleted });
});

// Simple health check
app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
