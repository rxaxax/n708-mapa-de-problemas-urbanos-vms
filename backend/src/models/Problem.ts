import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    anonymous: { type: Boolean, default: false },

    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🔥 SEMPRE OBRIGATÓRIO
    },
  },
  { timestamps: true }
);

export default mongoose.model("Problem", ProblemSchema);
