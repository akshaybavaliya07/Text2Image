import express from "express";
import {
  registerUser,
  loginUser,
  userCredits,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const route = express.Router();

route
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/verify-email/:token", verifyEmail)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password/:token", resetPassword)
  .use(verifyJWT)
  .get("/credits", userCredits);

export default route;
