const http = require('http');
const getPublicIP = require('./getMyPublicIP.js');
const PORT_NUM = process.env.PORT || 41234;


const Start = (dashboard) => {

    http.createServer(function (req, res) {
        let endPoint = req.url;
        EndPoints(endPoint, res, dashboard);
    }).listen(PORT_NUM);
    console.log("Listening to Port : " + PORT_NUM);
}

const EndPoints = (url, res, dashboard) => {

    switch (url) {
        case "/getip":
            getPublicIP.WhatsMyIpAddress((ipRes, err) => {
                if (ipRes) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });

                    let sendData = {
                        ip: ipRes,
                        port: dashboard.udpPort
                    }

                    res.write(JSON.stringify(sendData));
                    res.end();
                }
            })
            return;
            break;

        default:
            res.write('unknown endpoint!');
            break;

    }
    res.end();
}

module.exports = {
    Start
};