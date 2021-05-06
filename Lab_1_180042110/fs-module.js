//readFile
//writeFile
//appendFile
//delete
//rename

const fs = require("fs");

fs.writeFileSync('./Contents/demoFile.txt',"We are learning Node.js. ",(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Written successfully");
    }
})

fs.appendFileSync('./Contents/demoFile.txt',"We are learning JavaScript.");

console.log("before");

fs.readFile('./Contents/demoFile.txt',"utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        fs.appendFileSync('./Contents/demoFile.txt',"We are learning JavaScript.");
    }
});