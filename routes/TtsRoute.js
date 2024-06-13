import express from "express";

import { verifyUser } from "../middleware/AuthUser.js"; // Jika Anda memiliki middleware ini
import { getTts } from "../controllers/Tts.js ";

const router = express.Router();

router.post("/api/text-to-speech", getTts);

export default router;
