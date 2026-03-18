import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getPlaylists, createPlaylist, getPlaylistById, addTrackToPlaylist, updatePlaylist, removeTrackFromPlaylist, deletePlaylist, getRandomPlaylists } from "../controllers/playlistController.js";
import { uploadCover } from "../middleware/upload.js";

const router = express.Router();

router.get("/", verifyToken, getPlaylists);
router.post("/", verifyToken, createPlaylist);
router.get("/randomPlaylists", getRandomPlaylists);
router.get("/:id", verifyToken, getPlaylistById);
router.post("/:playlistId/tracks", verifyToken, addTrackToPlaylist);
router.delete("/:playlistId/tracks/:trackId", verifyToken, removeTrackFromPlaylist);
router.patch("/:id", verifyToken, uploadCover.single("coverImage"), updatePlaylist);
router.delete("/:playlistId", verifyToken, deletePlaylist)

export default router;

