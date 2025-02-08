const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Pool } = require("pg");

const router = express.Router();

const pool = new Pool({
    user: "your_username",
    host: "localhost",
    database: "your_db",
    password: "your_password",
    port: 5432,
});

router.get("/test", (req, res) => {
    res.json({ message: "User route is working!" });
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        //Check if user exists
        const result = await pool.query("SELECT id, password_hash FROM users WHERE username = $1", [username]);

        if (result.rows.lenght ==0){
            //Return generic error message
            return res.status(400).json({ error: "Invalid username or password" });
        }
    

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            //Return the same generic error message
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate JWT Token

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json ({ token, message: "Login successful"});
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;