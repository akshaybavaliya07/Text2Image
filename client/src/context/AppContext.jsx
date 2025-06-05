import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchUserCredits = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      toast.error("Token expired or invalid");
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserCredits();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    token,
    setToken,
    fetchUserCredits,
    showForgotPassword,
    setShowForgotPassword,
    showChangePassword, 
    setShowChangePassword
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
