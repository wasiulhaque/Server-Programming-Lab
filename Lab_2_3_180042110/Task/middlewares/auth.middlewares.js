const express = require('express');
const alert = require('alert');
const sessionStorage = require('sessionstorage');


const isLoggedIn = (req, res, next) => {
    const username = sessionStorage.getItem("username")
    console.log(username);
    if(username==null){
        res.redirect("/login");
        alert("Please login in order to access the dashboard");
    }
    else{
        next();
    }
}



module.exports = isLoggedIn;
