const express = require("express");
const router = express.Router();
const { getDoctors } = require("../controllers/doctorDetailsController"); // Ensure the path is correct
const { registerDoctor } = require("../controllers/doctorDetailsController"); // Ensure the path is correct

// Route to register a doctor
router.post("/register", registerDoctor);
router.get("/get", getDoctors);


module.exports = router;