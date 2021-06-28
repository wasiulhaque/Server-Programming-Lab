const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes.routes");



app.use(express.static("public"));
app.use(userRoutes);
app.get("/",(req,res)=>{
    //res.send("<h1>Home Page</h1>")
    res.sendFile("home.html",{root:"./views"})
})

app.get("/about",(req,res)=>{
    res.send("<h1>About Page</h1>")
})

app.post("/",(req,res) => {
    req.send("<h1>Home Page - POST Request'></a>");
})

app.get("/contact",(req,res)=>{
    res.send("<h1>Contact Page</h1>")
})

app.use((req,res) => {
    res.status(404).send("Error 404, the page you are looking for doesn't exist");
});

module.exports = app;