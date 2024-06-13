import express from "express";
import { Login, Logout, Me, updateUserProfile } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me/:id", Me);
router.post("/login", Login);
// router.delete("/logout/:id", Logout);
router.patch("/updateprofile/:id", updateUserProfile);

export default router;
