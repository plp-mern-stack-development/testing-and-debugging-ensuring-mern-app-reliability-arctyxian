const express = require("express");
const cors = require("cors");
const bugRoutes = require("./routes/bugRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/bugs", bugRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;