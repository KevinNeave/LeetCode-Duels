const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const duelRoutes = require ("./routes/duelRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/duels", duelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Leetcode Duels API!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});