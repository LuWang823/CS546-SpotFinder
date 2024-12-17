import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
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
    sharedCollection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    friend: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    requestReceived: [
      {
        sender_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        sender_name: { type: String, required: true },
        key: { type: String, required: true },
        status: {
          type: String,
          enum: ["accepted", "rejected", "pending"],
          default: "pending",
        },

        _id: false,
      },
    ],
    requestSent: [
      {
        to_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        to_name: {
          type: String,
          required: true,
        },
        key: { type: String, required: true },
        status: {
          type: String,
          enum: ["accepted", "rejected", "pending"],
          default: "pending",
        },
        _id: false,
      },
    ],

    hobby: {
      type: String,
    },
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

//userSchema.index({ email: 1 });

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "friend",
//   }).populate({
//     path: "sharedCollection",
//   });
//   next();
// });

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sharedCollection",
  });
  next();
});

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
