import mongoose from "mongoose";
import express from "express";
import { Entries } from "../model/Entries.models.js";
import {
  addEntries,
  deleteEntries,
  getEntries,
  updateEntries,
} from "../controller/Entries.controllers.js";
import { verifyToken } from "../middleware/authenticate.token.js";

const entriesRouter = express.Router();

entriesRouter.get("/getEntries", getEntries);

entriesRouter.post("/addEntries", verifyToken, addEntries);

entriesRouter.delete("/deleteEntries/:id", deleteEntries);

entriesRouter.put("/updateEntries/:id", updateEntries);

// entriesRouter.put("/updateEntries/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const updatedEntry = await Entries.findOneAndUpdate(
//       { _id: id },
//       { ...req.body },
//       {
//         new: true, // ✅ return the updated document
//         runValidators: true, // ✅ apply schema validation rules
//       }
//     );

//     if (!updatedEntry) {
//       return res.status(404).json({ error: "Entry not found" });
//     }

//     res.status(200).json(updatedEntry);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// });

// entriesRouter.put("/updateEntries/:id", async (req, res) => {
//   const { id } = req.params;
//   const { content } = req.body;

//   try {
//     const updatedEntry = await Entries.findByIdAndUpdate(
//       id,
//       { content }, // Only update the fields you want to update
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedEntry) {
//       return res.status(404).json({ message: "Entry not found" });
//     }

//     console.log("Updated entry:", updatedEntry);
//     res.status(200).json(updatedEntry);
//   } catch (err) {
//     console.error("Update error:", err.message);
//     res.status(400).json({ error: err.message });
//   }
// });

export default entriesRouter;
