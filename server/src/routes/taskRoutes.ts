import express, { Router } from "express";
import { createTask } from "../controllers/taskController";
import {
  getTasksForToday,
  getTasksForDate,
  getTasksForListAndToday,
  getTasksForListAndDate,
  getCompletedTasksForToday,
  getCompletedTasksForDate,
  getTasksFromListName,
  getAllTasks,
  deleteTask
} from "../controllers/taskController";

const authorization = require("../middleware/authorization")

const router: Router = express.Router();

// Protect all routes with authorization middleware
router.use(authorization);

// POST route for creating a new task
router.post("/", createTask);

// Get all tasks 
router.get("/all", getAllTasks);

// Get all tasks for today's date
router.get("/today", getTasksForToday);

// Get all tasks for a specific date
router.get("/date/:date", getTasksForDate);

// Get all tasks for a specific list
router.get("/list/:listname", getTasksFromListName);

// Get all tasks for a specific list and today's date
router.get("/list/:listId/today", getTasksForListAndToday);

// Get all tasks for a specific list and a specific date
router.get("/list/:listId/date/:date", getTasksForListAndDate);

// Get all completed tasks for today's date
router.get("/completed/today", getCompletedTasksForToday);

// Get all completed tasks for a specific date
router.get("/completed/date/:date", getCompletedTasksForDate);

// Delete task using its id
router.delete('/:task_id', deleteTask);

export default router;
