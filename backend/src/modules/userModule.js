import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: { type: String },
    address: { type: String },
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spot",
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: () => uuid(),
    },
    resetPasswordCode: String,
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
  // skip hashing if not modified
  if (!this.isModified("password")) {
    return next();
  }

  const saltRound = Number(process.env.saltRounds);
  this.password = await bcrypt.hash(this.password, saltRound);

  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  originalPassword,
) {
  return await bcrypt.compare(candidatePassword, originalPassword);
};

export default mongoose.model("User", userSchema);
