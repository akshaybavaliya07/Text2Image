import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const { setShowLogin, backendURL } =
    useContext(AppContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // extract token from query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const {data} = await axios.post(`${backendURL}/api/user/reset-password/${token}`, {password});

      if(data.success) {
        toast.success("Password reset successful. Please log in.");
        setShowLogin(true);
        navigate("/");  
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-3xl bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={submitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl text-neutral-700 font-medium text-center">
          Change Your Password
        </h1>

        {/* Password Input */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-md mt-5">
          <img src="/images/lock_icon.svg" alt="" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none text-sm flex-1"
            placeholder="New password"
            required
          />
        </div>

        {/* COnfirm Password Input */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-md mt-5">
          <img src="/images/lock_icon.svg" alt="" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="outline-none text-sm flex-1"
            placeholder="Re-enter new password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-md mt-5 text-white bg-blue-600 cursor-pointer"
        >
          Reset Password
        </button>
      </motion.form>
    </div>
  );
};

export default ChangePassword;
