const Bug = require("../models/Bug");
const asyncHandler = require("../middleware/asyncHandler");
const { validateBugPayload } = require("../utils/validation");

const getBugs = asyncHandler(async (req, res) => {
  const bugs = await Bug.find().sort({ createdAt: -1 });
  res.json(bugs);
});

const createBug = asyncHandler(async (req, res) => {
  const { isValid, errors } = validateBugPayload(req.body);
  if (!isValid) {
    res.status(400);
    throw new Error(errors.join(", "));
  }

  const bug = await Bug.create({
    title: req.body.title,
    description: req.body.description || "",
    status: req.body.status || "open"
  });

  console.log("Created bug", bug._id);
  res.status(201).json(bug);
});

const updateBug = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const bug = await Bug.findByIdAndUpdate(id, update, { new: true });
  if (!bug) {
    res.status(404);
    throw new Error("Bug not found");
  }

  console.log("Updated bug", bug._id);
  res.json(bug);
});

const deleteBug = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bug = await Bug.findByIdAndDelete(id);
  if (!bug) {
    res.status(404);
    throw new Error("Bug not found");
  }

  console.log("Deleted bug", bug._id);
  res.json({ message: "Bug removed" });
});

module.exports = { getBugs, createBug, updateBug, deleteBug };