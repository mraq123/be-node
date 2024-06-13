import express from "express";
import {
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleById,
} from "../controllers/Schedule.js";
import { AdminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/schedule", verifyUser, getSchedule);
router.get("/schedule/:id", verifyUser, getScheduleById);
router.post("/schedule", verifyUser, AdminOnly, createSchedule);
router.patch("/schedule/:id", verifyUser, AdminOnly, updateSchedule);
router.delete("/schedule/:id", verifyUser, AdminOnly, deleteSchedule);

export default router;
