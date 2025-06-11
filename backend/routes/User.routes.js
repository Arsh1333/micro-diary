import express from "express";
import {
  getUserList,
  login,
  register,
  getMe,
} from "../controller/Users.controllers.js";
import { verifyToken } from "../middleware/authenticate.token.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getUser", getUserList);
userRouter.get("/getMe", verifyToken, getMe);

export default userRouter;
