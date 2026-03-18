import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { search } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", verifyToken, search);

export default router;

