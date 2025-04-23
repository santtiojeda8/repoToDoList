import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema({
  fechaInicio: { type: String, required: true },
  fechaCierre: { type: String, required: true },
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarea", default: [] }],
  color: { type: String }, // para identificar visualmente
});

export default mongoose.model("Sprint", sprintSchema);