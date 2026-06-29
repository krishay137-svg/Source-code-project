require("dotenv").config();

const checkLogin=require("./middleware/auth");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

require("./config/db");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const commentsRoutes = require("./routes/comments");
const ratingsRoutes = require("./routes/ratings");
const usersRoutes = require("./routes/users");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({

    secret:process.env.SESSION_SECRET,

    resave:false,

    saveUninitialized:false

}));

app.use(express.static("public"));

app.use("/uploads",express.static("uploads"));

app.use("/auth",authRoutes);
app.use("/notes",notesRoutes);
app.use("/comments",commentsRoutes);
app.use("/ratings",ratingsRoutes);
app.use("/users",usersRoutes);

app.get("/",function(req,res){

    res.sendFile(path.join(__dirname,"views","index.html"));

});

app.get("/login",function(req,res){

    res.sendFile(path.join(__dirname,"views","login.html"));

});

app.get("/register",function(req,res){

    res.sendFile(path.join(__dirname,"views","register.html"));

});

app.get("/dashboard",checkLogin,function(req,res){

    res.sendFile(path.join(__dirname,"views","dashboard.html"));

});

app.get("/upload",checkLogin,function(req,res){

    res.sendFile(path.join(__dirname,"views","upload.html"));

});

app.get("/profile",checkLogin,function(req,res){

    res.sendFile(path.join(__dirname,"views","profile.html"));

});

app.listen(process.env.PORT,function(){

    console.log("Server Running on Port " + process.env.PORT);

});