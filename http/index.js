const http = require('http');
//keeping app alive
const keepAliveAgent = new http.Agent({keepAlive: false});
const fs = require('fs');

var io = require("socket.io");

// create Server
const proxy = http.createServer((req, res) => {
    console.log('------', __dirname);
    fs.readFile(__dirname + '/index.html', function (err, data) {
        console.log('dat --', data.toString());
        res.writeHead(200);
        res.end(data);
    })

});
io = io(proxy);

//listening proxy
proxy.listen('3000', () => {
    console.log('listening Port');
})

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
