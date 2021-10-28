const udp = require('./udpSetup.js');
const httpApi = require('./httpApi.js');

httpApi.Start();
udp.Init();