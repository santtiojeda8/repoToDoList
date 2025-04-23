
import Backlog from "../models/Backlog.js";
import Tarea from "../models/Tarea.js";

export const getBacklog = async (req, res) => {
  const backlog = await Backlog.findOne().populate("tareas");
  if (!backlog) return res.status(404).json({ error: "Backlog no creado" });
  res.json(backlog);
};

export const createBacklog = async (req, res ) => {
  const existente = await Backlog.findOne();
  if (existente) return res.status(400).json({ error: "Ya existe un backlog" });

  const backlog = new Backlog({ tareas: [] });
  await backlog.save();
  res.status(201).json(backlog);
};

export const addTaskToBacklog = async (req, res) => {
  const { taskId } = req.params;

  try {
    const tarea = await Tarea.findById(taskId);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    const backlog = await Backlog.findOne();
    if (!backlog) return res.status(404).json({ error: "Backlog no existe" });

   if (backlog.tareas.some(id => id.toString() === tarea._id.toString())) {
  return res.status(400).json({ error: "Tarea ya está en el backlog" });
}


    backlog.tareas.push(tarea._id);
    await backlog.save();

    res.json(backlog);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};
