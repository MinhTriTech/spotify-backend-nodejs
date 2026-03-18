import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import playlistRoutes from "./routes/playlist.js";
import trackRoutes from "./routes/track.js";
import meRoutes from "./routes/me.js";
import searchRoutes from "./routes/search.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/user", userRoutes);
app.use("/api/me", meRoutes);
app.use("/api/search", searchRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
