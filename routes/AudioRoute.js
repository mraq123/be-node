import express from "express";
import {
  getAudio,
  createAudio,
  updateAudio,
  deleteAudio,
  getAudioById,
  upload,
} from "../controllers/Audio.js";
import { AdminOnly, verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/audio", getAudio);
router.post(
  "/audio",

  AdminOnly,
  upload.single("audio_name_input"),
  createAudio
);
// router.post("/audio", createAudio);
// router.patch("/audio/:id", updateAudio);
router.patch(
  "/audio/:id",

  AdminOnly,
  upload.single("audio_name_input"),
  updateAudio
);
router.delete("/audio/:id", AdminOnly, deleteAudio);
router.get("/audio/:id", getAudioById);

export default router;
