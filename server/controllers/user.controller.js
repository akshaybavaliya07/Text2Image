import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const isUserExits = await User.findOne({ email });
  if (isUserExits)
    throw new ApiError(409, "User with this email already exists");

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = await jwt.sign({
    id: user._id,
  }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRY});

  res.status(201).json(new ApiResponse(200, {user, token}, "New user created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim()) throw new ApiError(400, "email is required");
  if (!password.trim()) throw new ApiError(400, "email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "invalid password");

  const token = await jwt.sign({
    id: user._id,
  }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRY});

  res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged In Successfully"));
});

const userCredits = asyncHandler( async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json(new ApiResponse(200, {creditBalance: user.creditBalance, name: user.name}, "User fetched successfully"))
});

export { 
    registerUser,
    loginUser,
    userCredits
};
