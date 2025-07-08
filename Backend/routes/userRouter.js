import express from "express";
import { getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.get("/getUser", isAuthenticated, getUser);


export default router;
