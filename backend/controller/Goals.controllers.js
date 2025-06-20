import { Goals } from "../model/Goals.models.js";

const addGoals = async (req, res) => {
  try {
    const { goalInput, entryId } = req.body;
    const goal = new Goals({
      goalInput,
      entryId,
    });
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.log(error);
  }
};

const getGoals = async (req, res) => {
  try {
    const { entryId } = req.params;
    const goals = await Goals.find({ entryId });
    res.status(200).json(goals);
    console.log("Goals shown");
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: err.message });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const goals = await Goals.find();
    res.status(200).json(goals);
    console.log("Goals shown");
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: err.message });
  }
};

export { addGoals, getGoals, getAllGoals };
