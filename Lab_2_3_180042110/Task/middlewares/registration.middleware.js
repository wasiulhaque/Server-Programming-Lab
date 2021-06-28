const express = require('express');
const alert = require('alert');
const sessionStorage = require('sessionstorage');

const registrationValidation = (req, res, next) => {
    const password = req.body.password;
    const conpassword = req.body.conpassword;
    if(password != conpassword){
        alert("Password didn't match");
    }
    else if(password.length < 6){
        alert("Password must consist at least 6 characters");
    }
    else{
        next();
    }
}

module.exports = registrationValidation;