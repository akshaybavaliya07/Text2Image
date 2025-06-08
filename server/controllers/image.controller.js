import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) throw new ApiError(400, "Prompt is required");

  const user = await User.findById(req.userId);

  if (user.creditBalance <= 0) {
    throw new ApiError(403, "Insufficient credits");
  }

  const formData = new FormData();
  formData.append("prompt", prompt);

  const { data } = await axios.post(process.env.CLIPDROP_API_URL, formData, {
    headers: {
      "x-api-key": process.env.CLIPDROP_API_KEY,
    },
    responseType: 'arraybuffer'
  });

  const base64Image = Buffer.from(data, 'binary').toString("base64");
  const resultImage = `data:image/png;base64,${base64Image}`;

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { $inc: { creditBalance: -1 } }
  );
  if (!updatedUser) throw new ApiError(403, "Insufficient credits");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { image: resultImage },
        "Image generated successfully"
      )
    );
});
