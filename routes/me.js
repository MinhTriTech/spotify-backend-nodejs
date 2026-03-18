import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, getMyProfile);

export default router;