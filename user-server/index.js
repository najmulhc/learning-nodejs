const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res) => { 
    const pathname = req.url;
    console.log(pathname)
    fs.readFile('./users.json', 'utf-8' ,(err, data) =>{
        res.end(data); // you can not send a direct array via api, you need to send it using json format. 
    })
})

server.listen(1234, ()=>{
    console.log("server is running!")
})