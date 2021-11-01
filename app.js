const httpApi = require('./httpApi.js');

let dashboard = {
    serverPort: 0000,
    serverIP: "NA"
}

httpApi.Start(dashboard);

//-----------------------------------------------------------
import dgram from 'dgram';

const server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.send(Buffer.from("HAND_SHAKE_MESSAGE"), 4456, "91.74.33.16", () => { })

server.bind(process.env.PORT);
// Prints: server listening 0.0.0.0:41234
