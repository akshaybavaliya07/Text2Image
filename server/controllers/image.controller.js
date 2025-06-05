import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import FormData from "form-data";
import { TEXT_TO_IMAGE_API_URL } from "../constants.js";

export const generateImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) throw new ApiError(400, "Prompt is required");

  const user = await User.findById(req.userId);

  if (user.creditBalance <= 0) {
    throw new ApiError(403, "Insufficient credits");
  }

  // const formData = new FormData();
  // formData.append("prompt", prompt);

  // const responseBuffer = await fetch(TEXT_TO_IMAGE_API_URL, {
  //   method: "POST",
  //   headers: {
  //     "x-api-key": process.env.CLIPDROP_API,
  //   },
  //   body: formData,
  // }).then((response) => response.arrayBuffer());

  // const base64Image = Buffer.from(responseBuffer, "binary").toString("base64");
  // const resultImage = `data:image/png;base64,${base64Image}`;

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.userId, creditBalance: { $gt: 0 } },
    { $inc: { creditBalance: -1 } }
  );
  if (!updatedUser) throw new ApiError(403, "Insufficient credits");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { image: "https://th.bing.com/th/id/OIP.mGlUcGdG-kz2Qw9sItcvwwAAAA" },
        "Image generated successfully"
      )
    );
});
