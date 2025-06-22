import express from "express";
import {
  addGoals,
  getAllGoals,
  getGoals,
} from "../controller/Goals.controllers.js";
import { Goals } from "../model/Goals.models.js";
const goalRouter = express.Router();

goalRouter.post("/addGoals", addGoals);
goalRouter.get("/getGoals/:entryId", getGoals);
goalRouter.get("/getGoals", getAllGoals);
// routes/goals.js
goalRouter.put("/toggleDone/:goalId", async (req, res) => {
  try {
    const goal = await Goals.findById(req.params.goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.isDone = !goal.isDone;
    const updatedGoal = await goal.save();
    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default goalRouter;
