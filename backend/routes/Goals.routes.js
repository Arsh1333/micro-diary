import express from "express";
import { Goals } from "../model/Goals.models.js";
import {
  addGoals,
  getAllGoals,
  getGoals,
} from "../controller/Goals.controllers.js";

const goalRouter = express.Router();

goalRouter.post("/addGoals", addGoals);
goalRouter.get("/getGoals/:entryId", getGoals);
goalRouter.get("/getGoals", getAllGoals);

export default goalRouter;
