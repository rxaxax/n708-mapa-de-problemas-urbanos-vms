import { Schema, model } from "mongoose";

const reportSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    description: { type: String, required: true },

    // Localização — Leaflet enviará lat/lng
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    category: {
      type: String,
      enum: ["Iluminação", "Pavimentação", "Segurança", "Lixo", "Esgoto", "Outros"],
      default: "Outros",
    },

    status: {
      type: String,
      enum: ["pendente", "em_andamento", "resolvido"],
      default: "pendente",
    },

    images: [{ type: String }],
  },
  { timestamps: true }
);

export default model("Report", reportSchema);
