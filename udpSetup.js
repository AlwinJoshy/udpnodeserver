const dgram = require('dgram');


const Init = () => {

    const PORT_NUM = 41234;

    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    /*
server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    let sendAddress = rinfo.address;
    let sendPort = rinfo.port;


    let msgData = Buffer.from("test data");

    server.send(msgData, 4455, '92.98.140.67', err => {
        console.log(err);
    })
});

*/
    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    //server.bind(PORT_NUM);
    // Prints: server listening 0.0.0.0:41234

    let serverAddress = server.address();
    setInterval(() => {
        
        SendDataToIP(server, Buffer.from("serverAddress.address" + " " + "serverAddress.port"));
    },
        1000);


}

const SendDataToIP = (server, msgData) => {
    console.log("Sending...");
    server.send(msgData, 4545, '92.98.140.67', err => {
        //console.log(err);
    })
}

module.exports = {
    Init
}