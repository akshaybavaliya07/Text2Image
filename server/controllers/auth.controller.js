import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "5m",
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`

  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    text: `Click this link to reset your password:  ${resetLink}`
  });

  res.status(200).json(new ApiResponse(200, null, "Reset link sent to your email"));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = tokenPayload?.userId;
    if(!userId) throw new ApiError(404, "Invalid or expired token");

    const user = await User.findById(userId);
    if(!user) throw new ApiError(404, "User not found");

    user.password = password;
    await user.save();

    res.status(200).json(new ApiResponse(200, null, "Password changed successful"))

});

export { forgotPassword, resetPassword };
