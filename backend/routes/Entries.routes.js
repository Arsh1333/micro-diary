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

export default entriesRouter;
