import mongoose from "mongoose";
import { Entries } from "../model/Entries.models.js";

// const getEntries = (req, res) => {
//   const entry = Entries.find({ owner: req.user._id });
//   // console.log(entry);
//   entry
//     .then((result) => res.status(200).json(result))
//     .catch((err) => res.status(401).json(err));
//   console.log("Entries shown");
// };
const getEntries = async (req, res) => {
  try {
    const entries = await Entries.find({ owner: req.user._id }).populate(
      "owner",
      "userName email"
    );
    res.status(200).json(entries);
    console.log("Entries shown");
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// const addEntries = (req, res) => {
//   const { content } = req.body;
//   const userId = req.user._id;

//   const newEntries = new Entries({
//     content: content,
//     owner: userId,
//   });
//   const savedEntries = newEntries
//     .save()
//     .then((entry) => res.status(201).json(entry))
//     .catch((err) => res.status(400).json({ error: err.message }));
//   savedEntries.populate("owner", "userName email");
// };
const addEntries = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;

    const newEntry = new Entries({
      content,
      owner: userId,
    });

    // Wait for it to save, then populate
    const savedEntry = await newEntry.save();
    await savedEntry.populate("owner", "userName email");

    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
