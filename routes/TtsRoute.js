import express from "express";
import { getTts } from "../controllers/Tts";

const router = express.Router();

router.post("/api/text-to-speech", getTts);

export default router;
