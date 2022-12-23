const http = require('http');

const server = http.createServer();


// the http module actually extends the events module that allows it to emmit and 
server.on('request', (req, res) => {
    console.log('now server request found.')
});

// for listening outside events of the server
server.listen(1234, '127.0.0.1', () => {
    console.log('server is listening');
});

// emitting events direct from the server that does not require any listener. 
server.emit('request');