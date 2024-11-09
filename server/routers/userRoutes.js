const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {upload} =require("../server.js")
const authmiddleware  = require("../middlewares/jwtMiddleware")

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", authmiddleware ,  loginUser);

module.exports = router;