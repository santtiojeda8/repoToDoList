import express from "express";
import {
  getBacklog,
  createBacklog,
  addTaskToBacklog,
} from "../controllers/backlogControler.js";

const router = express.Router();

router.get("/", getBacklog);
router.post("/", createBacklog);
router.put("/add-task/:taskId", addTaskToBacklog);

export default router;
