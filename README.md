# AuthApp - React + Node.js + MongoDB Authentication

A simple full-stack authentication app with user registration, login, and protected dashboard.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT tokens + bcrypt password hashing

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Navbar
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/              # Node.js backend
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── .env             # Environment variables
│   └── server.js
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

## Setup & Run

### 1. Configure MongoDB

Make sure MongoDB is running locally on port 27017, or update `server/.env` with your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/authapp
```

### 2. Start the Backend

```bash
cd server
npm install
npm start
```

The server runs on **http://localhost:5000**.

### 3. Start the Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The app runs on **http://localhost:3000**.

### 4. Open the App

Navigate to http://localhost:3000 in your browser.

## API Endpoints

| Method | Endpoint            | Description              | Auth Required |
|--------|---------------------|--------------------------|---------------|
| POST   | `/api/auth/register`| Register a new user      | No            |
| POST   | `/api/auth/login`   | Login                    | No            |
| GET    | `/api/auth/me`      | Get current user profile | Yes (JWT)     |
| POST   | `/api/auth/logout`  | Logout                   | Yes (JWT)     |

## Features

- User registration with username, email, and password
- Login with email and password
- JWT-based authentication (7-day token expiry)
- Protected dashboard route
- Password hashing with bcrypt
- Form validation on both client and server
- Auto-login after registration
- Responsive UI with clean styling
