# 🎵 Spotify Clone — Backend API

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Một backend RESTful API cho ứng dụng web nghe nhạc lấy cảm hứng từ Spotify. Được xây dựng bằng **Node.js**, **Express** và **MongoDB**, hỗ trợ xác thực người dùng (bao gồm Google OAuth), quản lý playlist, tải lên bài hát và chức năng tìm kiếm.

> 🖥️ **Kho lưu trữ Frontend:** [MinhTriTech/Spotify-Web-UI-Clone](https://github.com/MinhTriTech/Spotify-Web-UI-Clone)

---

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu cài đặt](#-yêu-cầu-cài-đặt)
- [Hướng dẫn bắt đầu](#-hướng-dẫn-bắt-đầu)
- [Biến môi trường](#-biến-môi-trường)
- [Tài liệu API](#-tài-liệu-api)
  - [Xác thực](#xác-thực-apiauth)
  - [Người dùng](#người-dùng-apiuser)
  - [Tôi (Người dùng hiện tại)](#tôi-người-dùng-hiện-tại-apime)
  - [Playlist](#playlist-apiplaylist)
  - [Bài hát](#bài-hát-apitracks)
  - [Tìm kiếm](#tìm-kiếm-apisearch)
- [Kho lưu trữ liên quan](#-kho-lưu-trữ-liên-quan)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

---

## ✨ Tính năng

- 🔐 **Xác thực** — Đăng ký, đăng nhập bằng email/mật khẩu và đăng nhập bằng Google OAuth
- 👤 **Hồ sơ người dùng** — Xem hồ sơ cá nhân và hồ sơ công khai của người dùng khác
- 🎵 **Quản lý Playlist** — Tạo, cập nhật, xóa playlist và quản lý bài hát trong đó
- 🎧 **Quản lý bài hát** — Tải lên file âm thanh, liên kết bài hát với playlist
- 🔍 **Tìm kiếm** — Tìm kiếm trên playlist và bài hát
- 🖼️ **Tải lên tệp** — Tải ảnh bìa cho playlist qua Multer
- 🔒 **Bảo vệ bằng JWT** — Các route được bảo vệ sử dụng JSON Web Token
- 🌐 **Hỗ trợ CORS** — Sẵn sàng xử lý yêu cầu từ nguồn gốc khác từ frontend

---

## 🛠️ Công nghệ sử dụng

| Tầng           | Công nghệ                                 |
|----------------|-------------------------------------------|
| Runtime        | [Node.js](https://nodejs.org/) (ESM)      |
| Framework      | [Express.js](https://expressjs.com/) 5.x  |
| Cơ sở dữ liệu  | [MongoDB](https://www.mongodb.com/) với [Mongoose](https://mongoosejs.com/) |
| Xác thực       | [bcrypt](https://github.com/nicktindall/bcrypt.js) · [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) · [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs) |
| Tải lên tệp    | [Multer](https://github.com/expressjs/multer) |
| Cấu hình       | [dotenv](https://github.com/motdotla/dotenv) |
| Công cụ dev    | [Nodemon](https://nodemon.io/)            |

---

## 📁 Cấu trúc dự án

```
spotify-backend-nodejs/
├── controllers/
│   ├── authController.js       # Đăng ký, đăng nhập, Google OAuth
│   ├── playlistController.js   # Thao tác CRUD cho playlist
│   ├── searchController.js     # Logic tìm kiếm
│   ├── trackController.js      # Tải lên và truy xuất bài hát
│   └── userController.js       # Truy xuất hồ sơ người dùng
├── middleware/
│   ├── authMiddleware.js       # Xác minh JWT token
│   └── upload.js               # Cấu hình Multer cho tải lên tệp
├── models/
│   ├── Playlist.js             # Schema Playlist (với virtual trackCount)
│   ├── Track.js                # Schema Track
│   └── User.js                 # Schema User
├── routes/
│   ├── auth.js                 # Routes /api/auth
│   ├── me.js                   # Routes /api/me
│   ├── playlist.js             # Routes /api/playlist
│   ├── search.js               # Routes /api/search
│   ├── track.js                # Routes /api/tracks
│   └── user.js                 # Routes /api/user
├── .env.example                # Ví dụ biến môi trường
├── .gitignore
├── package.json
├── script.js                   # Script tiện ích/seed dữ liệu
└── server.js                   # Điểm khởi chạy ứng dụng
```

---

## ✅ Yêu cầu cài đặt

Đảm bảo bạn đã cài đặt các thành phần sau:

- [Node.js](https://nodejs.org/) phiên bản 18 trở lên
- [npm](https://www.npmjs.com/) phiên bản 8 trở lên
- Một instance [MongoDB](https://www.mongodb.com/) (cục bộ hoặc [MongoDB Atlas](https://www.mongodb.com/atlas))
- Một dự án [Google Cloud](https://console.cloud.google.com/) với OAuth 2.0 Client ID (để đăng nhập bằng Google)

---

## 🚀 Hướng dẫn bắt đầu

### 1. Clone kho lưu trữ

```bash
git clone https://github.com/MinhTriTech/spotify-backend-nodejs.git
cd spotify-backend-nodejs
```

### 2. Cài đặt các gói phụ thuộc

```bash
npm install
```

### 3. Cấu hình biến môi trường

Sao chép tệp mẫu và điền các giá trị của bạn:

```bash
cp .env.example .env
```

Xem phần [Biến môi trường](#-biến-môi-trường) để biết chi tiết.

### 4. Khởi động server phát triển

```bash
npm run dev
```

Server sẽ khởi chạy tại **http://localhost:5000**.

---

## 🔧 Biến môi trường

Tạo tệp `.env` trong thư mục gốc với các biến sau:

| Biến                 | Bắt buộc | Mô tả                                               |
|----------------------|----------|-----------------------------------------------------|
| `MONGO_URI`          | ✅       | Chuỗi kết nối MongoDB                              |
| `JWT_SECRET`         | ✅       | Khóa bí mật dùng để ký và xác minh JWT token       |
| `GOOGLE_CLIENT_ID`   | ✅       | Google OAuth 2.0 Client ID để đăng nhập bằng Google |

**Ví dụ tệp `.env`:**

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/spotify-clone
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

> ⚠️ Không bao giờ commit tệp `.env` lên hệ thống quản lý phiên bản. Tệp này đã được liệt kê trong `.gitignore`.

---

## 📡 Tài liệu API

URL gốc: `http://localhost:5000`

Tất cả các route được bảo vệ đều yêu cầu header `Authorization: Bearer <token>`.

---

### Xác thực (`/api/auth`)

| Phương thức | Endpoint             | Auth | Mô tả                              |
|-------------|----------------------|------|------------------------------------|
| POST        | `/api/auth/register` | ❌   | Đăng ký người dùng mới             |
| POST        | `/api/auth/login`    | ❌   | Đăng nhập bằng email và mật khẩu  |
| POST        | `/api/auth/google`   | ❌   | Đăng nhập hoặc đăng ký bằng Google |

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

### Người dùng (`/api/user`)

| Phương thức | Endpoint                  | Auth | Mô tả                                    |
|-------------|---------------------------|------|------------------------------------------|
| GET         | `/api/user/randomUsers`   | ❌   | Lấy danh sách người dùng ngẫu nhiên      |
| GET         | `/api/user/:id`           | ✅   | Lấy hồ sơ công khai của người dùng theo ID |

---

### Tôi (Người dùng hiện tại) (`/api/me`)

| Phương thức | Endpoint    | Auth | Mô tả                                         |
|-------------|-------------|------|-----------------------------------------------|
| GET         | `/api/me`   | ✅   | Lấy hồ sơ của người dùng đang đăng nhập       |

---

### Playlist (`/api/playlist`)

| Phương thức | Endpoint                                    | Auth | Mô tả                                       |
|-------------|---------------------------------------------|------|---------------------------------------------|
| GET         | `/api/playlist`                             | ✅   | Lấy tất cả playlist của người dùng hiện tại |
| POST        | `/api/playlist`                             | ✅   | Tạo playlist mới                            |
| GET         | `/api/playlist/randomPlaylists`             | ❌   | Lấy danh sách playlist ngẫu nhiên           |
| GET         | `/api/playlist/:id`                         | ✅   | Lấy playlist theo ID (kèm bài hát)          |
| POST        | `/api/playlist/:playlistId/tracks`          | ✅   | Thêm bài hát vào playlist                   |
| DELETE      | `/api/playlist/:playlistId/tracks/:trackId` | ✅   | Xóa bài hát khỏi playlist                  |
| PATCH       | `/api/playlist/:id`                         | ✅   | Cập nhật thông tin playlist (tên, ảnh bìa)  |
| DELETE      | `/api/playlist/:playlistId`                 | ✅   | Xóa playlist                                |

<details>
<summary>POST <code>/api/playlist</code> — Tạo Playlist</summary>

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
<summary>PATCH <code>/api/playlist/:id</code> — Cập nhật Playlist</summary>

Chấp nhận `multipart/form-data` để hỗ trợ tải lên ảnh bìa.

**Các trường Form:**
- `title` (string, tùy chọn) — Tên playlist mới
- `description` (string, tùy chọn) — Mô tả playlist mới
- `coverImage` (file, tùy chọn) — Ảnh bìa mới
</details>

---

### Bài hát (`/api/tracks`)

| Phương thức | Endpoint                        | Auth | Mô tả                                                  |
|-------------|---------------------------------|------|--------------------------------------------------------|
| GET         | `/api/tracks/randomTracks`      | ❌   | Lấy danh sách bài hát ngẫu nhiên                       |
| POST        | `/api/tracks/_hidden/upload`    | ❌   | Tải lên file âm thanh (chỉ dùng nội bộ/quản trị viên) |
| GET         | `/api/tracks/:playlistId`       | ✅   | Lấy tất cả bài hát trong một playlist cụ thể           |
| POST        | `/api/tracks/:playlistId`       | ✅   | Tạo bài hát mới và thêm vào playlist                   |

<details>
<summary>POST <code>/api/tracks/:playlistId</code> — Tạo bài hát</summary>

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

### Tìm kiếm (`/api/search`)

| Phương thức | Endpoint       | Auth | Mô tả                                          |
|-------------|----------------|------|------------------------------------------------|
| GET         | `/api/search`  | ✅   | Tìm kiếm playlist và bài hát theo từ khóa     |

**Query Parameters:**

| Tham số | Kiểu   | Mô tả                          |
|---------|--------|--------------------------------|
| `q`     | string | Từ khóa tìm kiếm               |

**Ví dụ:** `GET /api/search?q=rock`

---

## 🔗 Kho lưu trữ liên quan

| Kho lưu trữ | Mô tả |
|-------------|-------|
| ⚙️ **[spotify-backend-nodejs](https://github.com/MinhTriTech/spotify-backend-nodejs)** (repo này) | Backend REST API với Node.js + Express |
| 🖥️ **[Spotify-Web-UI-Clone](https://github.com/MinhTriTech/Spotify-Web-UI-Clone)** | Frontend React — giao diện web người dùng |

---

## 🤝 Đóng góp

Chúng tôi luôn chào đón mọi đóng góp! Vui lòng thực hiện theo các bước sau:

1. **Fork** kho lưu trữ
2. **Tạo** một nhánh tính năng mới:
   ```bash
   git checkout -b feature/ten-tinh-nang-cua-ban
   ```
3. **Commit** các thay đổi với thông điệp rõ ràng:
   ```bash
   git commit -m "feat: mô tả tính năng của bạn"
   ```
4. **Push** lên fork của bạn:
   ```bash
   git push origin feature/ten-tinh-nang-cua-ban
   ```
5. **Mở Pull Request** trên GitHub và mô tả các thay đổi của bạn

Vui lòng đảm bảo code của bạn tuân theo phong cách hiện tại và bạn đã kiểm tra các thay đổi.

---

## 📄 Giấy phép

Dự án này được cấp phép theo **Giấy phép ISC**. Xem tệp [LICENSE](./LICENSE) để biết chi tiết.
