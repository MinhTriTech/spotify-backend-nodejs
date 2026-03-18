import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getRandomUsers, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/randomUsers", getRandomUsers);
router.get("/:id", verifyToken, getUserProfile);

export default router;