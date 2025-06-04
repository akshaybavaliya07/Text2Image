import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const { token } = req.headers;
    if (!token) throw new ApiError(401, "Unauthorized request");

    const userPayload = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = userPayload.id;

    next();
  } catch (err) {
    throw new ApiError(401, "Invalid Token");
  }
};
