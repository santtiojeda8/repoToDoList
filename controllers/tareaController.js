import Sprint from "../models/Sprint.js";
import Tarea from "../models/Tarea.js";


export const getAllTasks = async (req , res)  => {
  const tareas = await Tarea.find();
  res.json(tareas);
};

export const getTaskById = async (req , res)  => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

export const createTask = async (req , res)  => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req , res)  => {
  try {
    const actualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(actualizada);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

export const deleteTask = async (req , res)  => {
  try {
    const enSprint = await Sprint.findOne({ tareas: req.params.id });
    if (enSprint) return res.status(400).json({ error: "No se puede eliminar: tarea asignada a un sprint" });

    const eliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json({ mensaje: "Tarea eliminada" });
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};
