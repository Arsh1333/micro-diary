import mongoose from "mongoose";
import express from "express";
import { Entries } from "../model/Entries.models.js";

const entriesRouter = express.Router();

entriesRouter.get("/getEntries", (req, res) => {
  const entry = Entries.find().sort({ createdAt: -1 });
  // console.log(entry);
  entry
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(401).json(err));
  console.log("Entries shown");
});

entriesRouter.post("/addEntries", (req, res) => {
  const { content } = req.body;

  const newEntries = new Entries({
    content: content,
  });

  newEntries
    .save()
    .then((entry) => res.status(201).json(entry))
    .catch((err) => res.status(400).json({ error: err.message }));
});

entriesRouter.delete("/deleteEntries/:id", (req, res) => {
  const { id } = req.params;
  const deletedEntry = Entries.findOneAndDelete({ _id: id });
  deletedEntry
    .then((a) => {
      console.log(a);
      res.status(200).json(a);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
});

entriesRouter.put("/updateEntries/:id", (req, res) => {
  const { id } = req.params;
  const changedEntry = Entries.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    {
      new: true, // ✅ return the updated document
      runValidators: true, // ✅ apply schema validation rules
    }
  );
  changedEntry
    .then((a) => {
      console.log(a);
      console.log("Updated entry:", a);
      res.status(200).json(a);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
});
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
