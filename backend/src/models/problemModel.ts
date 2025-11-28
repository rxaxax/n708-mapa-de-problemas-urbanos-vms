import { Schema, model } from "mongoose";

const ProblemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: [
        "Iluminação",
        "Pavimentação",
        "Segurança",
        "Lixo",
        "Esgoto",
        "Outros",
      ],
      default: "Outros",
    },

    status: {
      type: String,
      enum: ["pendente", "em_andamento", "resolvido"],
      default: "pendente",
    },

    anonymous: { type: Boolean, default: false },

    address: { type: String, required: true, trim: true },

    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    lng: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    images: [
      {
        type: String,
        match: /^https?:\/\/.+/ // opcional
      },
    ],
  },
  { timestamps: true }
);

export default model("Problem", ProblemSchema);
