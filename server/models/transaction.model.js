import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "date", updatedAt: false },
  }
);

export const Transaction = mongoose.model.Transaction || mongoose.model("transaction", transactionSchema);
 