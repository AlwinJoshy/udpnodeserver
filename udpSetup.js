const dgram = require('dgram');


const Init = () => {

    const PORT_NUM = 41234;

    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        let sendAddress = rinfo.address;
        let sendPort = rinfo.port;

    
        let msgData = Buffer.from("test data");

        server.send(msgData, sendPort, sendAddress, err => {
            console.log(err);
        })
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    server.bind(PORT_NUM);
    // Prints: server listening 0.0.0.0:41234

}

module.exports = {
    Init
}