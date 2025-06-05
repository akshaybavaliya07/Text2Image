import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const useImageGenerator = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { user, token, fetchUserCredits } = useContext(AppContext);
  const navigate = useNavigate();

  const generateImage = async (prompt) => {
    try {
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
};
