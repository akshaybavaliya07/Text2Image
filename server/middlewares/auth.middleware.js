import jwt from "jsonwebtoken";

export const verifyJWT = async (req, _, next) => {
  try {
    const { token } = req.headers;
    if (!token) if (!token) return;

    const userPayload = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = userPayload.id;

    next();
  } catch (err) {}
};
