import { createRazorpayInstance } from "../config/razorpay.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { plans } from "../constants.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import { convertUSDToINR } from "../utils/convertUSDToINR.js"
 
const razorpayInstance = createRazorpayInstance();

export const createOrder = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const userId = req.userId;
  if (!userId || !planId) throw new ApiError(400, "Details missing");

  const selectedPlan = plans.find((p) => p.id === planId);
  if (!selectedPlan) throw new ApiError(400, "Plan not found!");
  const plan = selectedPlan.id;
  const amount = selectedPlan.price;
  const credits = selectedPlan.credits;

  const amountInINR = await convertUSDToINR(amount);

  const transaction = await Transaction.create({
    userId,
    plan,
    amount: amountInINR,
    credits,
  });

  const options = {
    amount: parseInt(amountInINR * 100),
    currency: process.env.CURRENCY,
    receipt: transaction._id,
  };

  razorpayInstance.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating the order",
      });
    }
    res.status(200).json(new ApiResponse(200, order, "Order created successfully"));
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id } = req.body;

  const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

  if(!orderInfo.status === "paid") throw new ApiError(400, "Payment failed");

  const transaction = await Transaction.findById(orderInfo.receipt);
  const user = await User.findById(req.userId);

  const creditBalance = user.creditBalance + transaction.credits;
  await User.findByIdAndUpdate(user._id, {creditBalance});
  await Transaction.findByIdAndUpdate(transaction._id, { payment: true});

  res.status(200).json(new ApiResponse(200, null, "Credits Added"));
});
