const udp = require('./udpSetup.js');
const httpApi = require('./httpApi.js');

let dashboard = {
    udpPort:0000,
    serverIP:"NA"
}

httpApi.Start(dashboard);
udp.Init(dashboard);