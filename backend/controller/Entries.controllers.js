import mongoose from "mongoose";
import { Entries } from "../model/Entries.models.js";

const getEntries = (req, res) => {
  const entry = Entries.find().sort({ createdAt: -1 });
  // console.log(entry);
  entry
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(401).json(err));
  console.log("Entries shown");
};

const addEntries = (req, res) => {
  const { content } = req.body;

  const newEntries = new Entries({
    content: content,
  });
  newEntries
    .save()
    .then((entry) => res.status(201).json(entry))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const deleteEntries = (req, res) => {
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
};

const updateEntries = (req, res) => {
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
};

export { getEntries, addEntries, deleteEntries, updateEntries };
