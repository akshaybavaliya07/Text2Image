import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.HASH_SALT_ROUND)
  );
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.models.user || mongoose.model("user", userSchema);
