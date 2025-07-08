import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import {sendToken} from '../utils/jwtToken.js'


export const getUser = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};