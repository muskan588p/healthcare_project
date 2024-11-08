//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, '/views/partials'));
const multer=require("multer");
const upload=multer({dest:"uploads/"});

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
    })
})


app.get("/allusers",(req,res)=>{
    res.render("users",{
        users: [
            { username: "Muskan", date: "23-10-2024", subject: "Maths" },
            { username: "Piyush", date: "23-10-2024", subject: "Science" },
            { username: "Anshuman", date: "23-10-2024", subject: "History" }
        ]
    })
})

// route for user registration and authentication

app.use("/api/register",require("./routers/userRoutes"));

app.post('/profile', upload.single('avatar'),function(req,res,next){
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
});
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"/tmp/my-uploads")
    },
    filename:function (req,file,cb){
        const uniqueSuffix=Date.now()+"-"+ Math.round(Math.random()*1E9)
        cb(null, file.fieldname+ "-"+ uniqueSuffix);
    }
})

// const upload=multer({storage:storage});



// APP CONFIG START
app.listen(port, () =>{
    console.log(`Server running in port http://localhost:${port}`);
});