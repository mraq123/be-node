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

router.get("/schedule", getSchedule);
router.get("/schedule/:id", getScheduleById);
router.post("/schedule", AdminOnly, createSchedule);
router.patch("/schedule/:id", AdminOnly, updateSchedule);
router.delete("/schedule/:id", AdminOnly, deleteSchedule);

export default router;
