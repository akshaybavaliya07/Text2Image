import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmailVerificationLink, sendPasswordResetLink } from "../utils/sendEmail.js";
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

  const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  await sendEmailVerificationLink({to:user.email, token});

  res
    .status(201)
    .json(new ApiResponse(200, { token }, "New user created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim()) throw new ApiError(400, "email is required");
  if (!password.trim()) throw new ApiError(400, "password is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  if (!user.isEmailVerified) {
    const token = jwt.sign({ id: user._id },   // verification token
      process.env.TOKEN_SECRET, {
      expiresIn: "5m",
    });
    await sendEmailVerificationLink({to:user.email, token});
    throw new ApiError(
      401,
      "Please verify your email before login. Verification link sent"
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "invalid password");

  const token = await jwt.sign(  // access token
    {
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY }
  );

  res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged In Successfully"));
});

const userCredits = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.userId, isEmailVerified: true });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { creditBalance: user.creditBalance, name: user.name },
        "User fetched successfully"
      )
    );
});

const verifyEmail =  asyncHandler(async (req, res) => {
  const {token} = req.params;
  if(!token) throw new ApiError(400, "Verification token is required");

  const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = tokenPayload?.id;
  if (!userId) throw new ApiError(404, "Invalid or expired token");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  user.isEmailVerified = true;
  await user.save();  

  res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "5m",
  });

  await sendPasswordResetLink({to:user.email, token});

  res
    .status(200)
    .json(new ApiResponse(200, null, "Reset link sent to your email"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = tokenPayload?.id;
  if (!userId) throw new ApiError(404, "Invalid or expired token");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  user.password = password;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successful"));
});

export {
  registerUser,
  loginUser,
  userCredits,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
