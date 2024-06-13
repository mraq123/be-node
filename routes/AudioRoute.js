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

router.get("/audio", verifyUser, getAudio);
router.post(
  "/audio",
  verifyUser,
  AdminOnly,
  upload.single("audio_name_input"),
  createAudio
);
// router.post("/audio", createAudio);
// router.patch("/audio/:id", updateAudio);
router.patch(
  "/audio/:id",
  verifyUser,
  AdminOnly,
  upload.single("audio_name_input"),
  updateAudio
);
router.delete("/audio/:id", verifyUser, AdminOnly, deleteAudio);
router.get("/audio/:id", verifyUser, getAudioById);

export default router;
