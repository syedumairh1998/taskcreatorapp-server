import express from "express";
import { createUser, userLogin } from "../controllers/UserController.js";
import { validateUserData } from "../middleware/validateData.js";

let userRouter = express.Router();

userRouter.post(
  "/register",
  validateUserData("user registeration"),
  createUser
);
userRouter.post("/login", validateUserData("user login"), userLogin);

export { userRouter };
