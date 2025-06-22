import express from "express";
import {
  addGoals,
  getAllGoals,
  getGoals,
  goalsDone,
} from "../controller/Goals.controllers.js";
import { Goals } from "../model/Goals.models.js";
const goalRouter = express.Router();

goalRouter.post("/addGoals", addGoals);
goalRouter.get("/getGoals/:entryId", getGoals);
goalRouter.get("/getGoals", getAllGoals);
// routes/goals.js
goalRouter.put("/toggleDone/:goalId", goalsDone);

export default goalRouter;
