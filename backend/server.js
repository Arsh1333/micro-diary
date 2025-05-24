import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import connectDb from "./db/connectDb.js";
import entriesRouter from "./routes/Entries.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/reviews", entriesRouter);
connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
