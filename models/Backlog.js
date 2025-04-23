import mongoose from "mongoose";

const backlogSchema = new mongoose.Schema({
  tareas: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarea" }],
    default: [],
  },
});

export default mongoose.model("Backlog", backlogSchema);
