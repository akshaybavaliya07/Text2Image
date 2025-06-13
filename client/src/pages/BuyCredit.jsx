import React, { useContext, useState} from "react";
import { plans } from "../../constants.js";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const BuyCredit = () => {
  const { user, setShowLogin, backendURL, token, fetchUserCredits } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const initiateRazorpayPayment = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "credits payment",
      description: "credits payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data} = await axios.post(
            `${backendURL}/api/user/verify-payment`,
            response,
            { headers: { token } }
          );
          if(data.success) {
            fetchUserCredits();
            toast.success("Credits added");
          }
        } catch (error) {
          const errMsg = error.response?.data?.message || error.message;
          toast.error(errMsg);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const payNow = async (planId) => {
    if(!user) setShowLogin(true);
    setLoading(true);

    try {
      // Create order by calling the server endpoint
      const { data } = await axios.post(
        `${backendURL}/api/user/create-order`,
        { planId },
        { headers: { token } }
      );

      if(data.success) {
        // Open Razorpay Checkout
        initiateRazorpayPayment(data.data);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
   }

  return (
    <motion.div
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-3xl font-medium mb-6 sm:mb-10">Choose Plan</h1>

      <div className="flex flex-wrap justify-center text-left gap-6">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-800 hover:scale-105 transition-all duration-500"
          >
            <img src="/images/logo_icon.svg" alt="" width={40} />
            <p className="font-semibold mt-3 mb-1">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => payNow(item.id)}
              disabled={loading}
              className={`w-full text-sm rounded-md py-2.5 min-w-52 mt-8 cursor-pointer transition-opacity duration-200
                ${ loading ? "bg-gray-500 cursor-not-allowed opacity-60" : "bg-gray-800 text-white"}`}
            >
              {user ? "Purchase" : "Get Stared"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
