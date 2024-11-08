const mongoose = require("mongoose");

const doctorDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// const Doctor = mongoose.model("Doctor", doctorDetailsSchema);

// module.exports = Doctor;

// const express = require("express");
// const router = express.Router();
// // const { registerDoctor,deleteDoctor} = require("../controllers/doctorsDetailsController"); // Ensure the path is correct
// const { registerDoctor, deleteDoctor, getAllDoctors, getDoctorByEmail } = require("../controllers/doctorsDetailsController");

// // Route to register a doctor
// router.post("/register", registerDoctor);
// router.delete("/delete/:email", deleteDoctor);


// // Route to get all doctors
// router.get("/", getAllDoctors); // This route will return all doctors

// // Route to get a specific doctor by email
// router.get("/email/:email", getDoctorByEmail); // This route will return a specific doctor by email


// module.exports = router;