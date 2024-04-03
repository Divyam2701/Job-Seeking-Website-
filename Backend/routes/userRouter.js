import express from "express";
import {login, logout, register, getUser} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", isAuthenticated ,login);
router.post("/logout", logout);
router.get("/getUser", getUser);

export default router;
    