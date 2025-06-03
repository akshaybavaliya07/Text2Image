import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";

const Login = () => {
  const { setShowLogin } = useContext(AppContext);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl text-neutral-700 font-medium text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        <p className="text-sm">
          {isLogin
            ? "Welcome back! Please sign in to continue"
            : "Ready to turn ideas into images? Sign up and start generating!"}
        </p>

        {!isLogin && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src="/images/profile_icon.png" alt="" width={20} />
            <input
              type="text"
              className="outline-none text-sm"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src="/images/email_icon.svg" alt="" />
          <input
            type="email"
            className="outline-none text-sm"
            placeholder="example@gmail.com"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src="/images/lock_icon.svg" alt="" />
          <input
            type="password"
            className="outline-none text-sm"
            placeholder="password"
            required
          />
        </div>

        {isLogin && (
          <p className="text-sm text-blue-600 my-2 cursor-pointer">
            Forget password ?
          </p>
        )}

        <button className="w-full bg-blue-600 text-white py-2 rounded-full mt-2">
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="text-center mt-5">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </>
          )}
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src="/images/cross_icon.svg"
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
