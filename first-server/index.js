const http = require('http');

const server = http.createServer((req, res)=>{
    res.end("this is a response from the vanila node js server using http module")
})


 

    server.listen(5500, '127.0.0.1', ()=>{
        console.log('server is listening....🎧')
    })