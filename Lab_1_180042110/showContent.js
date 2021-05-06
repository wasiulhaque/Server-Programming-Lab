const http = require('http');
const fetch = require('./loadContent');

const server = http.createServer((req,res)=>{
    
    if(req.url == "/"){
        res.write(fetch.blades.index);
        res.end();
    }

    else if(req.url == "/about"){
        res.write(fetch.blades.about);
        res.end();
    }

    else if(req.url == "/blog"){
        res.write(fetch.blades.blog);
        res.end();
    }

    else if(req.url == "/contact"){
        res.write(fetch.blades.contact);
        res.end();
    }

    else if(req.url == "/pricing"){
        res.write(fetch.blades.pricing);
        res.end();
    }

    else if(req.url == "/services"){
        res.write(fetch.blades.services);
        res.end();
    }

    else if(req.url == "/work"){
        res.write(fetch.blades.work);
        res.end();
    }
    
    else{
        res.write("<h1>Page doesn't exist.</h1>");
        res.end();
    }

});

module.exports = {server};

