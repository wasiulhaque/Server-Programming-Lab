const HelloFunc = require('./helloWorld')
console.log(HelloFunc.name);

//setInterval
setInterval(()=>{
    HelloFunc.Hello();
}, 1000);

setTimeout(()=>{
    console.log(HelloFunc.name);
}, 5000);


//Local Module
//Global Module
//3rd Party Module or Package