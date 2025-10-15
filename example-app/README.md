# Example Full-Stack App (Express + React + Tailwind)

This example demonstrates a minimal, production-ready full-stack project using:

- Backend: Node.js + Express (local JSON data store)
- Frontend: Vite + React + Tailwind (via CDN)

Features:

- CRUD API for posts (GET, POST, PUT, DELETE)
- Posts may contain a YouTube or Spotify link that will be embedded automatically
- Frontend displays posts, supports adding, editing, and deleting inline

Folder structure

```
example-app/
  backend/
    server.js            # Express server
    package.json
    data/posts.json      # Local JSON data store
    README.md
  frontend/
    index.html
    package.json
    src/
      main.jsx
      App.jsx
      styles.css
      components/
        PostForm.jsx
        Post.jsx
    README.md
  README.md
```

Quick start (local)

1. Run the backend

```bash
cd example-app/backend
npm install
npm run dev   # starts server on http://localhost:4000
# or `npm start` to run without nodemon
```

Available backend endpoints:

- GET /posts -> returns JSON array of posts
- POST /posts -> create a new post (body: { link, header, subheader, body })
- PUT /posts/:id -> update a post
- DELETE /posts/:id -> delete a post
- GET /health -> simple health check

2. Run the frontend

```bash
cd example-app/frontend
npm install
npm run dev   # starts Vite dev server (default http://localhost:5173)
```

By default the frontend uses API base `http://localhost:4000`. To override set `VITE_API_BASE` in a `.env` file in the frontend folder, e.g.:

```
VITE_API_BASE=http://localhost:4000
```

3. Connect and test

- Open the frontend in the browser (Vite will show the URL) and use the UI to add/edit/delete posts
- Or use curl to test the backend:

```bash
# Health
curl http://localhost:4000/health

# Create
curl -X POST http://localhost:4000/posts -H "Content-Type: application/json" \
  -d '{"header":"Test","subheader":"sub","body":"hello","link":"https://youtu.be/dQw4w9WgXcQ"}'

# Get
curl http://localhost:4000/posts

# Update (replace ID)
curl -X PUT http://localhost:4000/posts/<id> -H "Content-Type: application/json" -d '{"header":"Updated"}'

# Delete
curl -X DELETE http://localhost:4000/posts/<id>
```

Deployment

Backend (Render recommended):

- Create a new Web Service on Render (or another host)
- Connect your Git repo and set the root to `example-app/backend`
- Build/Start command: `npm install && npm start` (start uses `node server.js`)
- Set `PORT` environment variable (Render does this automatically)

Frontend (GitHub Pages or Render static site):

- Build the frontend: `npm run build`
- For GitHub Pages: push the `dist` folder to a `gh-pages` branch or use `gh-pages` package
- For Render: create a Static Site, point to `example-app/frontend` and set the build command to `npm install && npm run build` and publish the `dist` folder
- Make sure to set `VITE_API_BASE` (render or GH Pages env) to the backend URL if deployed separately

Switching to MongoDB

- Replace the local file read/write in `backend/server.js` with a MongoDB connection and a Posts model (Mongoose). This example used a JSON file for simplicity.

Security & Production notes

- The local JSON store is not suitable for production (use Mongo/Postgres)
- Sanitize and validate inputs on the server (use libraries like joi or express-validator)
- Use HTTPS in production
- Add authentication/authorization for post management

If you'd like, I can:

- Convert the backend to use MongoDB + Mongoose
- Add authentication (JWT) to protect create/update/delete
- Add full Tailwind config and production-ready CSS

Enjoy — you can run the example locally now.
