const express = require("express");
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");

const hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, '/views/partials'));

const dotenv = require("dotenv");
dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

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
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})


app.get("/allusers",(req,res)=>{
    res.render("users",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
