import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const { setShowForgotPassword, backendURL } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailSending) return;

    try {
      setEmailSending(true);

      const { data } = await axios.post(
        `${backendURL}/api/user/forgot-password`,
        { email }
      );
      if (data.success) {
        setShowForgotPassword(false);
        toast.success(data.message);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    } finally {
      setEmailSending(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={submitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl text-neutral-700 font-medium text-center">
          Forgot Password
        </h1>

        {/* Email Input */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-md mt-5">
          <img src="/images/profile_icon.png" alt="" width={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none text-sm flex-1"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled= {emailSending}
          className={`w-full py-2 rounded-md mt-5 text-white 
            ${ emailSending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
        >
          Reset Password
        </button>

        {/* Close Icon */}
        <img
          onClick={() => setShowForgotPassword(false)}
          src="/images/cross_icon.svg"
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default ForgetPassword;
