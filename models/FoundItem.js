import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    fdId: { type: String, required: true, unique: true }, // FD-xxxxx

    finderName: String,
    finderEmail: String,
    contact: String,

    itemName: String,
    itemType: String,
    description: String,

    date: String,
    time: String,
    location: String,

    imageUrl: String,
    status: {
      type: String,
      default: "Available", // Available | Matched | Returned
    },

    matchedLfId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.FoundItem ||
  mongoose.model("FoundItem", foundItemSchema);
