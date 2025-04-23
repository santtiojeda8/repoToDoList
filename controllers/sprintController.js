
import Sprint from "../models/Sprint.js";
import Tarea from "../models/Tarea.js";

export const getAllSprints = async (req , res) => {
  const sprints = await Sprint.find().populate("tareas");
  res.json(sprints);
};

export const getSprintById = async (req , res)  => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate("tareas");
    if (!sprint) return res.status(404).json({ error: "Sprint no encontrado" });
    res.json(sprint);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

export const createSprint = async (req , res)  => {
  try {
    const sprint = new Sprint(req.body);
    await sprint.save();
    res.status(201).json(sprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSprint = async (req , res)  => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sprint) return res.status(404).json({ error: "Sprint no encontrado" });
    res.json(sprint);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

export const deleteSprint = async (req , res)  => {
  try {
    const sprint = await Sprint.findByIdAndDelete(req.params.id);
    if (!sprint) return res.status(404).json({ error: "Sprint no encontrado" });
    res.json({ mensaje: "Sprint eliminado" });
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

export const addTaskToSprint = async (req , res)  => {
  const { id, taskId } = req.params;

  try {
    const tarea = await Tarea.findById(taskId);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    const sprint = await Sprint.findById(id);
    if (!sprint) return res.status(404).json({ error: "Sprint no encontrado" });

    if (sprint.tareas.includes(tarea._id)) {
      return res.status(400).json({ error: "Tarea ya asignada a este sprint" });
    }

    sprint.tareas.push(tarea._id);
    await sprint.save();

    res.json(sprint);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};
