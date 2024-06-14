import express from "express";
import { getTts } from "../controllers/Tts.js";

const router = express.Router();

router.post("/api/text-to-speech", getTts);

export default router;
