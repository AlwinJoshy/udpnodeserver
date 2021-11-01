const httpApi = require('./httpApi.js');
const dgram = require('dgram');

let dashboard = {
    serverPort: 0000,
    serverIP: "NA"
}

httpApi.Start(dashboard);

//-----------------------------------------------------------


const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

setTimeout(() => {
    setInterval(() => {
        server.send(Buffer.from("HAND_SHAKE_MESSAGE"), 4456, "91.74.33.16", () => { })
    }, 1000)
}
    , 3000)



//server.bind(5656);
// Prints: server listening 0.0.0.0:41234
