//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const doctorsDetails = require("./router/doctorsDetails");

hbs.registerPartials(path.join(__dirname, '/views/partials'));
const multer=require("multer");

const upload=multer({dest:"uploads/"});
const Profile = require("./models/profile");

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors());

app.use(errorHandler);

// ERROR handling middleware
app.use(errorHandler);

app.set('view engine', 'hbs');


//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

app.get("/home",(req,res)=>{
    res.render("home",{
        users: [
            { username: "Muskan", date: "23-10-2024", subject: "Maths" },
            { username: "Piyush", date: "23-10-2024", subject: "Science" },
            { username: "Anshuman", date: "23-10-2024", subject: "History" }
        ]
    });
});


app.get("/allusers",(req,res)=>{
    res.render("users",{
        users: [
            { username: "Muskan", date: "23-10-2024", subject: "Maths" },
            { username: "Piyush", date: "23-10-2024", subject: "Science" },
            { username: "Anshuman", date: "23-10-2024", subject: "History" }
        ]
    });
});

// route for user registration and authentication

app.use("/api/register",require("./routers/userRoutes"));
app.use("/api/doctors", doctorsDetails);

app.post('/profile', upload.single('avatar'),function(req,res,next){
    console.log(req.body);
    console.log(req.file);

    try {
        // Save the uploaded image path to the database (Profie model)
        const newProfile = new Profile({ image: req.file.path });
        await newProfile.save();

        // Redirect or render the profile view with the uploaded image
        res.render("profile", { image: req.file.path });
    } catch (err) {
        console.error("Error saving profile:", err);
        next(err);
    }
    // Redirect to /home after the upload
    //return res.redirect("/home");
});


// const upload=multer({storage:storage});









// APP CONFIG START
app.listen(port, () =>{
    console.log(`Server running in port http://localhost:${port}`);
});