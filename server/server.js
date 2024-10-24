const express = require("express");
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.get('/', (req,res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
