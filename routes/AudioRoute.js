import express from "express";
import {
  getAudio,
  createAudio,
  updateAudio,
  deleteAudio,
  getAudioById,
  upload,
} from "../controllers/Audio.js";
// import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/audio", getAudio);
router.post("/audio", upload.single("audio_name_input"), createAudio);
router.patch("/audio/:id", upload.single("audio_name_input"), updateAudio);
router.delete("/audio/:id", deleteAudio);
router.get("/audio/:id", getAudioById);

export default router;
