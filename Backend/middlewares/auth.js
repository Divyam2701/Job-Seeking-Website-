import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  // Hardcoded user, always authorized
  req.user = {
    _id: "000000000000000000000000",
    name: "Demo User",
    email: "demo@example.com",
    role: "Employer", // or "Job Seeker"
    phone: "1234567890"
  };
  next();
};

