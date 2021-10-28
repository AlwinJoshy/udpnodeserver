const dgram = require('dgram');

const Init = (dashboard) => {

    const server = dgram.createSocket({
        type: "udp4",
        reuseAddr: true // <- NOTE: we are asking OS to let us reuse port
    });
    let ipRec;
    let portRec;

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

        let sendAddress = rinfo.address;
        let sendPort = rinfo.port;

        let sendData = sendAddress + "|" + sendPort;
        let msgData = Buffer.from(sendData);

        server.send(msgData, sendPort, sendAddress, err => {
            if (err) console.log(err);
        })

    });




    server.on('listening', () => {
        const address = server.address();
        ipRec = address.address;
        portRec = address.port;
        dashboard.udpPort = address.port;
        console.log(`server listening ${address.address}:${address.port}`);
    });

    server.bind(process.env.PORT || 41234);

    setTimeout(() => {
        setInterval(() => {
            SendDataToIP(server, Buffer.from("wdawdwa"))
        }, 1000)
    }
        , 3000)

}


const SendDataToIP = (server, msgData) => {
    server.send(msgData, 4545, '92.98.140.67', err => {
        //console.log(err);92.98.140.67
    })
}

module.exports = {
    Init
}