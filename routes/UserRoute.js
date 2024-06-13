import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/Users.js";
import { verifyUser, AdminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", AdminOnly, getUsers);
router.get("/users/:id", getUserById);
router.post("/users", AdminOnly, createUser);
router.patch("/users/:id", AdminOnly, updateUser);
router.delete("/users/:id", AdminOnly, deleteUser);

export default router;
