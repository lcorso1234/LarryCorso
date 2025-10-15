# Example Backend (Express)

Simple Express server that stores posts in a local JSON file (`data/posts.json`).

Run locally:

```bash
cd example-app/backend
npm install
npm run dev  # requires nodemon
# or npm start
```

API endpoints:

- GET /posts
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id
- GET /health

The server auto-embeds YouTube and Spotify links when creating/updating posts.

## Authentication

This example uses a very simple JWT-based auth for protecting POST/PUT/DELETE routes.

Default credentials (for local development):

- username: `admin`
- password: `password123`

To login, POST to `/auth/login` with JSON `{ "username": "admin", "password": "password123" }` and you'll receive a token.
Use that token in the `Authorization: Bearer <token>` header when calling protected endpoints.

Tip: copy `.env.example` to `.env` and change `JWT_SECRET`, `AUTH_USER`, and `AUTH_PASS` for your environment.
