import express from "express";
import { viewTasks } from "../controllers/TaskController.js";
import { AuthMiddleware } from "../middleware/Auth.js";

let taskRouter = express.Router();

taskRouter.get("/view", AuthMiddleware, viewTasks);

export { taskRouter };
