
# AuthApp — React + Node.js + MongoDB Authentication
# AuthApp — React + Node.js + MongoDB Authentication

A full-stack authentication app with user registration, login, a protected dashboard, and a protected About page.

## Tech Stack

- **Frontend:** React 18 + Vite + React Router 6
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT tokens (7-day expiry) + bcrypt password hashing

## Project Structure

```
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Navbar, ProtectedRoute
│   │   ├── context/         # AuthContext (login/logout/user state)
│   │   ├── css/             # App.css, styles.css (component styles)
│   │   ├── pages/           # Login, Register, Dashboard, About
│   │   ├── index.css        # Global reset & base styles
│   │   ├── App.jsx          # Routes + layout
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── vite.config.js       # Dev server (port 3000, /api proxy → :5000)
│   └── package.json
├── server/                  # Node.js backend (Express)
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # Mongoose User model
│   ├── routes/              # /api/auth routes
│   ├── .env                 # MONGODB_URI, JWT_SECRET, PORT
│   ├── server.js            # Express app entry
│   └── package.json
├── docs/                    # Project documentation
├── mongodb-data/            # Local MongoDB data directory
└── README.md
```

## Prerequisites

- **Node.js** 18+
- **MongoDB** running locally (or a MongoDB Atlas URI)

## Setup & Run

### 1. Configure Environment

Create or edit `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/authapp
JWT_SECRET=your-secret-key
PORT=5000
```

### 2. Start the Backend

```bash
cd server
npm install
npm run dev      # uses nodemon (auto-restart)
# or: npm start  # plain node
```

The API runs on **http://localhost:5000**.

### 3. Start the Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The app runs on **http://localhost:3000**.

> The Vite dev server proxies all `/api/*` requests to `http://localhost:5000`, so no CORS issues in development.

### 4. Open the App

Navigate to **http://localhost:3000** in your browser. You'll be redirected to the login page.

## Routes

| Path         | Component   | Access       | Description                          |
|--------------|-------------|--------------|--------------------------------------|
| `/`          | —           | Public       | Redirects to `/login`                |
| `/login`     | `Login`     | Public       | Sign in with email & password        |
| `/register`  | `Register`  | Public       | Create a new account                 |
| `/dashboard` | `Dashboard` | Public*      | Profile card + auth status           |
| `/about`     | `About`     | **Protected**| Developer info & tech stack          |

\* The dashboard is accessible without a token, but the About page is wrapped in a `ProtectedRoute` component that redirects to `/login` if no valid JWT is present.

## API Endpoints

| Method | Endpoint             | Description              | Auth Required |
|--------|----------------------|--------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user      | No            |
| POST   | `/api/auth/login`    | Login                    | No            |
| GET    | `/api/auth/me`       | Get current user profile | Yes (JWT)     |
| POST   | `/api/auth/logout`   | Logout (client clears token) | Yes (JWT) |

## Features

- **User registration** with username, email, and password (min 6 chars)
- **Login** with email and password
- **JWT-based authentication** — 7-day token expiry, stored in `localStorage`
- **Protected routes** — `ProtectedRoute` component guards the About page
- **Dashboard** — shows profile card, avatar, and auth status
- **About page** — developer bio and tech stack (authenticated users only)
- **Navbar** — context-aware: shows Login/Sign Up when logged out; Dashboard, About, and Logout when logged in
- **Password hashing** with bcrypt
- **Form validation** on both client and server
- **Auto-login** after successful registration
- **Clean, responsive UI** with consistent styling (CSS organized in `src/css/`)

## Environment Variables

| Variable      | Location       | Description                          |
|---------------|----------------|--------------------------------------|
| `MONGODB_URI` | `server/.env`  | MongoDB connection string            |
| `JWT_SECRET`  | `server/.env`  | Secret key for signing JWT tokens    |
| `PORT`        | `server/.env`  | Backend port (default: `5000`)       |

A full-stack authentication app with user registration, login, a protected dashboard, and a protected About page.

## Tech Stack


- **Frontend:** React 18 + Vite + React Router 6
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)

- **Auth:** JWT tokens (7-day expiry) + bcrypt password hashing

## Project Structure

