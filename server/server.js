import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/mongodb.config.js"
import userRouter from "./routes/user.routes.js"
import imageRouter from "./routes/image.routes.js"
import {errHandler} from "./middlewares/errorHandler.middleware.js"

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// Database connection 
await connectDB();

app
  .use("/api/user", userRouter)
  .use("/api/image", imageRouter)

app.use(errHandler);

app.listen(PORT, () => console.log(`🕹️ Server started on ${PORT}`));
