import express from "express";
import {
  getAudio,
  createAudio,
  updateAudio,
  deleteAudio,
  getAudioById,
} from "../controllers/Audio.js";
// import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/audio", getAudio);
router.post("/audio", createAudio);
router.patch("/audio/:id", updateAudio);
router.delete("/audio/:id", deleteAudio);
router.get("/audio/:id", getAudioById);

export default router;
