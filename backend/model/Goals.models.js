import { mongoose, Schema } from "mongoose";

const goalSchema = new Schema(
  {
    goalInput: {
      type: String,
      required: true,
    },
    entryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entries",
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Goals = mongoose.model("Goals", goalSchema);
