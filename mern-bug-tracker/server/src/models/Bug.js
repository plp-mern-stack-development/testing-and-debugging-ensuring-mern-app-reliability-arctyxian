const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);