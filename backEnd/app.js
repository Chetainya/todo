const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const cors = require("cors")


mongoose.connect("mongodb://localhost:27017/todo").then(() => console.log("DB connected")).catch((err) => console.log(err))

const userRouter = require("./router/user");
const todoRouter = require("./router/todo");

const authenticateViaToken = require('./middleware/authentication');


const PORT = 8000;

const app = express();


app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
  }))

app.use(authenticateViaToken("token"));



app.use("/user" , userRouter)
app.use("/todo"  , todoRouter);

app.get('/' , (req , res) => {
    return res.send("Home Page");
});

app.listen(PORT , () => console.log(`App running on PORT-${PORT}`));

