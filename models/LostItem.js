import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    lfId: { type: String, required: true, unique: true }, // LF-xxxxx

    userName: String,
    userEmail: String,

    itemName: String,
    itemType: String,
    description: String,

    date: String,
    time: String,
    location: String,

    contact: String,
    reward: String,

    imageUrl: String, // later Cloudinary
    status: {
      type: String,
      default: "Pending", // Pending | Matched | Closed
    },
  },
  { timestamps: true }
);

export default mongoose.models.LostItem ||
  mongoose.model("LostItem", lostItemSchema);
