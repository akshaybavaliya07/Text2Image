import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const useImageGenerator = () => {

  const { user, token, fetchUserCredits, setShowLogin, backendURL, setGeneratedImages} = useContext(AppContext);

  const navigate = useNavigate();

  const updateGenerateImagesArray = ( newImage) => {
    setGeneratedImages(prevImages => {
      const updated = [newImage, ...prevImages];
      if (updated.length > 5) updated.pop();
      return updated;
    });
  } 

  const generateImage = async (prompt) => {
    try {
      if (!user || !token) {
        toast.error("Please login to generate images.");
        setShowLogin(true);
        return null;
      }

      if (user.creditBalance === 0) {
        toast.error("Insufficient credit balance.");
        navigate("/buy-credits");
        return null;
      }

      const { data } = await axios.post(
        backendURL + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        fetchUserCredits();
        updateGenerateImagesArray(data.data.image);
        return data.data.image;
      }

      return null;
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to generate image";
      toast.error(errMsg);
      return null;
    }
  };

  return { generateImage };
}
