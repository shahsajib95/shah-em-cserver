import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long."],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    address: {
      type: String,
    },
    store: {
      type: String,
    },
    storeAvatar:{
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
