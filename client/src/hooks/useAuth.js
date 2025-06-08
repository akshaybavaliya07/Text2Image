import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setShowLogin, setUser, setToken, backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(backendURL + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        setShowLogin(false);
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem("token", data.data.token);
      }
    } catch (error) {
      toast.dismiss(); // Remove any existing toasts:

      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    }
  };

  const register = async (name, email, password, setIsLogin) => {
    try {
      const { data } = await axios.post(backendURL + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success("Verification link sent to your email.");
        setIsLogin(true);
        localStorage.setItem("token", data.data.token);
      }
    } catch (error) {
      toast.dismiss(); // Remove any existing toasts:

      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return { login, register, logout };
};
