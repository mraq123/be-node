import express from "express";
import { Login, Logout, Me, updateUserProfile } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);
router.patch("/updateprofile", updateUserProfile);

export default router;
