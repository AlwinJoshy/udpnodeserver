const net = require('net');

const Init = () => {

    const server = net.createServer((c) => {
        // 'connection' listener.
        console.log('client connected');
        console.log("Address : " + c.remotePort);
        c.on('end', () => {
            console.log('client disconnected');
        });
        c.write('hello\r\n');
        c.pipe(c);
    });
    server.on('error', (err) => {
        throw err;
    });
    server.listen(process.env.PORT || 51234, () => {
        console.log('server bound');
    });
}

module.exports = {
    Init
}