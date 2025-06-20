import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import connectDb from "./db/connectDb.js";
import entriesRouter from "./routes/Entries.routes.js";
import userRouter from "./routes/User.routes.js";
import goalRouter from "./routes/Goals.routes.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/reviews", entriesRouter);
app.use("/api/users", userRouter);
app.use("/api/goals", goalRouter);
connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
