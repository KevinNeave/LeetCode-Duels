const express = require("express");
const router = express.Router();

// Dummy routeç
router.get("/", (req, res) => {
    res.json({ message: "Duel route is working!" });
  });
  
module.exports = router; 