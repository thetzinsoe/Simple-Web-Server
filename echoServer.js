"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var net = require("net");

function newConn(socket) {
    console.log('new connection', socket.remoteAddress, socket.remotePort);
    socket.on('end', function() {
        // FIN received. The connection will be closed automatically.
        console.log('EOF.');
    });
    socket.on('data', function(data) {
        console.log('data:', data);

        if (data.includes('q')) {
            // socket.end();
            console.log('closing.');
            socket.destroy();
        } else if (!socket.destroyed && !socket.writableEnded) {
            socket.write(data); // echo back the data
        }
    });
}
var server = net.createServer();
server.on('error', function(err) {
    throw err;
});
server.on('connection', newConn);
server.listen({
    host: '127.0.0.1',
    port: 1234
});