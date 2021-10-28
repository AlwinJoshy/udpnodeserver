const dgram = require('dgram');


const Init = () => {

    const PORT_NUM = process.env.PORT || 41234;

    const server = dgram.createSocket('udp4');
    let ipRec;
    let portRec;

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });


server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    
    /*
    let sendAddress = rinfo.address;
    let sendPort = rinfo.port;

    
    let msgData = Buffer.from("test data");


    server.send(msgData, 4455, '92.98.140.67', err => {
        console.log(err);
    })
    */
});


    server.on('listening', () => {
        const address = server.address();
        ipRec = address.address;
        portRec = address.port;
        console.log(`server listening ${address.address}:${address.port}`);
    });

    server.bind(PORT_NUM);
    // Prints: server listening 0.0.0.0:41234

    setTimeout(() =>{
        setInterval(() => {

            let data = ipRec + "|" + portRec;
            SendDataToIP(server, Buffer.from(data));
        },
        1000);

    }, 3000)

   


}

const SendDataToIP = (server, msgData) => {
    server.send(msgData, 4545, '127.0.0.1', err => {
        //console.log(err);92.98.140.67
    })
}

module.exports = {
    Init
}