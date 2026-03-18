import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getTracksByPlaylist, createTrack, getRandomTracks, hiddenUploadTrack } from "../controllers/trackController.js";
import { uploadTrackAudio } from "../middleware/upload.js";

const router = express.Router();

router.get("/randomTracks", getRandomTracks);
router.post("/_hidden/upload", uploadTrackAudio.single("audio"), hiddenUploadTrack);
router.get("/:playlistId", verifyToken, getTracksByPlaylist);
router.post("/:playlistId", verifyToken, createTrack);

export default router;