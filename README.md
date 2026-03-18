# 🎵 Spotify Clone — Backend API

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A RESTful API backend for a Spotify-inspired music streaming web application. Built with **Node.js**, **Express**, and **MongoDB**, it supports user authentication (including Google OAuth), playlist management, track uploads, and search functionality.

> 🖥️ **Frontend Repository:** [MinhTriTech/Spotify-Web-UI-Clone](https://github.com/MinhTriTech/Spotify-Web-UI-Clone)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
  - [Authentication](#authentication-apiauth)
  - [Users](#users-apiuser)
  - [Me (Current User)](#me-current-user-apime)
  - [Playlists](#playlists-apiplaylist)
  - [Tracks](#tracks-apitracks)
  - [Search](#search-apisearch)
- [Related Repositories](#-related-repositories)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔐 **Authentication** — Register, login with email/password, and login with Google OAuth
- 👤 **User Profiles** — View own profile and other users' public profiles
- 🎵 **Playlist Management** — Create, update, delete playlists and manage tracks within them
- 🎧 **Track Management** — Upload audio files, associate tracks with playlists
- 🔍 **Search** — Search across playlists and tracks
- 🖼️ **File Uploads** — Cover image upload for playlists via Multer
- 🔒 **JWT Protection** — Protected routes using JSON Web Tokens
- 🌐 **CORS Enabled** — Ready for cross-origin requests from the frontend

---

## 🛠️ Tech Stack

| Layer         | Technology                                |
|---------------|-------------------------------------------|
| Runtime       | [Node.js](https://nodejs.org/) (ESM)      |
| Framework     | [Express.js](https://expressjs.com/) 5.x  |
| Database      | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) |
| Authentication| [bcrypt](https://github.com/nicktindall/bcrypt.js) · [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) · [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs) |
| File Uploads  | [Multer](https://github.com/expressjs/multer) |
| Config        | [dotenv](https://github.com/motdotla/dotenv) |
| Dev Tool      | [Nodemon](https://nodemon.io/)            |

---

## 📁 Project Structure

```
spotify-backend-nodejs/
├── controllers/
│   ├── authController.js       # Register, login, Google OAuth
│   ├── playlistController.js   # CRUD operations for playlists
│   ├── searchController.js     # Search logic
│   ├── trackController.js      # Track upload and retrieval
│   └── userController.js       # User profile retrieval
├── middleware/
│   ├── authMiddleware.js       # JWT token verification
│   └── upload.js               # Multer configuration for file uploads
├── models/
│   ├── Playlist.js             # Playlist schema (with virtual trackCount)
│   ├── Track.js                # Track schema
│   └── User.js                 # User schema
├── routes/
│   ├── auth.js                 # /api/auth routes
│   ├── me.js                   # /api/me routes
│   ├── playlist.js             # /api/playlist routes
│   ├── search.js               # /api/search routes
│   ├── track.js                # /api/tracks routes
│   └── user.js                 # /api/user routes
├── .env.example                # Example environment variables
├── .gitignore
├── package.json
├── script.js                   # Utility/seed script
└── server.js                   # App entry point
```

---

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v8 or higher
- A [MongoDB](https://www.mongodb.com/) instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Cloud](https://console.cloud.google.com/) project with an OAuth 2.0 Client ID (for Google login)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MinhTriTech/spotify-backend-nodejs.git
cd spotify-backend-nodejs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

See the [Environment Variables](#-environment-variables) section for details.

### 4. Start the development server

```bash
npm run dev
```

The server will start on **http://localhost:5000**.

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable             | Required | Description                                         |
|----------------------|----------|-----------------------------------------------------|
| `MONGO_URI`          | ✅       | MongoDB connection string                           |
| `JWT_SECRET`         | ✅       | Secret key used to sign and verify JWT tokens       |
| `GOOGLE_CLIENT_ID`   | ✅       | Google OAuth 2.0 Client ID for Google login         |

**Example `.env` file:**

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/spotify-clone
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

> ⚠️ Never commit your `.env` file to version control. It is already listed in `.gitignore`.

---

## 📡 API Documentation

Base URL: `http://localhost:5000`

All protected routes require a `Authorization: Bearer <token>` header.

---

### Authentication (`/api/auth`)

| Method | Endpoint             | Auth | Description                        |
|--------|----------------------|------|------------------------------------|
| POST   | `/api/auth/register` | ❌   | Register a new user                |
| POST   | `/api/auth/login`    | ❌   | Login with email and password      |
| POST   | `/api/auth/google`   | ❌   | Login or register with Google      |

<details>
<summary>POST <code>/api/auth/register</code></summary>

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response `201`:**
```json
{
  "token": "<jwt_token>",
  "user": { "_id": "...", "username": "john_doe", "email": "john@example.com" }
}
```
</details>

<details>
<summary>POST <code>/api/auth/login</code></summary>

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "token": "<jwt_token>",
  "user": { "_id": "...", "username": "john_doe", "email": "john@example.com" }
}
```
</details>

<details>
<summary>POST <code>/api/auth/google</code></summary>

**Request Body:**
```json
{
  "credential": "<google_id_token>"
}
```

**Response `200`:**
```json
{
  "token": "<jwt_token>",
  "user": { "_id": "...", "username": "john_doe", "email": "john@example.com" }
}
```
</details>

---

### Users (`/api/user`)

| Method | Endpoint                  | Auth | Description                        |
|--------|---------------------------|------|------------------------------------|
| GET    | `/api/user/randomUsers`   | ❌   | Get a list of random users         |
| GET    | `/api/user/:id`           | ✅   | Get a user's public profile by ID  |

---

### Me (Current User) (`/api/me`)

| Method | Endpoint    | Auth | Description                            |
|--------|-------------|------|----------------------------------------|
| GET    | `/api/me`   | ✅   | Get the currently authenticated user's profile |

---

### Playlists (`/api/playlist`)

| Method | Endpoint                                  | Auth | Description                         |
|--------|-------------------------------------------|------|-------------------------------------|
| GET    | `/api/playlist`                           | ✅   | Get all playlists of the current user |
| POST   | `/api/playlist`                           | ✅   | Create a new playlist               |
| GET    | `/api/playlist/randomPlaylists`           | ❌   | Get a list of random playlists      |
| GET    | `/api/playlist/:id`                       | ✅   | Get a playlist by ID (with tracks)  |
| POST   | `/api/playlist/:playlistId/tracks`        | ✅   | Add a track to a playlist           |
| DELETE | `/api/playlist/:playlistId/tracks/:trackId` | ✅ | Remove a track from a playlist      |
| PATCH  | `/api/playlist/:id`                       | ✅   | Update playlist info (name, cover)  |
| DELETE | `/api/playlist/:playlistId`               | ✅   | Delete a playlist                   |

<details>
<summary>POST <code>/api/playlist</code> — Create a Playlist</summary>

**Request Body:**
```json
{
  "title": "My Playlist",
  "description": "A collection of my favorite songs"
}
```

**Response `201`:**
```json
{
  "_id": "...",
  "title": "My Playlist",
  "description": "A collection of my favorite songs",
  "owner": "<userId>",
  "tracks": [],
  "trackCount": 0
}
```
</details>

<details>
<summary>PATCH <code>/api/playlist/:id</code> — Update a Playlist</summary>

Accepts `multipart/form-data` to support cover image upload.

**Form Fields:**
- `title` (string, optional) — New playlist title
- `description` (string, optional) — New playlist description
- `coverImage` (file, optional) — New cover image
</details>

---

### Tracks (`/api/tracks`)

| Method | Endpoint                        | Auth | Description                                       |
|--------|---------------------------------|------|---------------------------------------------------|
| GET    | `/api/tracks/randomTracks`      | ❌   | Get a list of random tracks                       |
| POST   | `/api/tracks/_hidden/upload`    | ❌   | Upload an audio file (internal/admin use)         |
| GET    | `/api/tracks/:playlistId`       | ✅   | Get all tracks in a specific playlist             |
| POST   | `/api/tracks/:playlistId`       | ✅   | Create a new track and add it to a playlist       |

<details>
<summary>POST <code>/api/tracks/:playlistId</code> — Create a Track</summary>

**Request Body:**
```json
{
  "title": "Song Title",
  "artist": "Artist Name",
  "audioUrl": "/uploads/tracks/song.mp3",
  "duration": 240,
  "coverImage": "https://example.com/cover.jpg"
}
```
</details>

---

### Search (`/api/search`)

| Method | Endpoint       | Auth | Description                                   |
|--------|----------------|------|-----------------------------------------------|
| GET    | `/api/search`  | ✅   | Search playlists and tracks by keyword        |

**Query Parameters:**

| Parameter | Type   | Description                     |
|-----------|--------|---------------------------------|
| `q`       | string | The search keyword to query for |

**Example:** `GET /api/search?q=rock`

---

## 🔗 Related Repositories

| Repository | Description |
|------------|-------------|
| ⚙️ **[spotify-backend-nodejs](https://github.com/MinhTriTech/spotify-backend-nodejs)** (this repo) | Node.js + Express REST API backend |
| 🖥️ **[Spotify-Web-UI-Clone](https://github.com/MinhTriTech/Spotify-Web-UI-Clone)** | React frontend — the web user interface |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** on GitHub and describe your changes

Please make sure your code follows the existing style and that you have tested your changes.

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](./LICENSE) file for details.
