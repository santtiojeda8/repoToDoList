import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String }, // opcional
  estado: {
    type: String,
    enum: ["pendiente", "en progreso", "completado"],
    required: true,
  },
  fechaLimite: { type: String, required: true },
  color: { type: String }, // puedes usar un código hex, por ejemplo: "#FF0000"
});

export default mongoose.model("Tarea", tareaSchema);
