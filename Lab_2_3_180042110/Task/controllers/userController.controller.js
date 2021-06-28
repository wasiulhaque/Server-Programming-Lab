const db = require("../models/database");
const bcrypt = require('bcryptjs');
const alert = require('alert');
const sessionStorage = require('sessionstorage');


const getRegister = (req,res) => {
    res.sendFile("register.html",{root:"./views/templates/AdminLTE-master/pages/examples"});
}

const postRegister = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    db.query(`SELECT email FROM users WHERE username = '${username}' or email = '${email}'`, async (err, result) => {
        if (err){
            console.log(error);
        }

        if (result.length > 0){
            alert("This Email/Username is already in use");
        }

        else{
            let hashed = await bcrypt.hash(password,8);
            db.query(`INSERT INTO users SET ?`,{username:username,email:email,password:hashed},(err,result) =>{
                if(err) console.log(err);
                else{
                    console.log("User Registration Successful.");
                    alert("User Registration Successful.");
                    res.redirect("/login");
                }
            })
        }
        });
}

const getLogin = (req,res) => {
    sessionStorage.clear();
    res.sendFile("login.html",{root:"./views/templates/AdminLTE-master/pages/examples"});
}

const postLogin = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if(!username) alert("Please enter your Username");
    else if(!password) alert("Please enter your Password");
    else{
        db.query(`SELECT * FROM users WHERE username = ?`,[username],async(err,result) => {
            if(result[0] == undefined){
                console.log("No Username Found");
                alert("Invalid Credentials.");
                res.redirect("/login");
            }
            else if(!result || !(await bcrypt.compare(password,result[0].password))){
                console.log("Invalid Credentials.");
                alert("Invalid Credentials.");
                res.redirect("/login");
            }
            else{
                res.cookie("isLoggedIn","Yes");
                sessionStorage.setItem("username", username);
                res.redirect(`/dashboard`);
            }
        });
    } 
}

const getDashboard = (req,res) => {
    const username = sessionStorage.getItem("username");
    alert("Welcome, " + username);
    res.sendFile("index.html",{root:"./views/templates/AdminLTE-master"});
}

module.exports = {getRegister,postRegister,getLogin,getDashboard,postLogin};