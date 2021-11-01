const { Console } = require('console');
const http = require('http');

const PORT_NUM = process.env.PORT || 41234;
let httpServer = null;
let body = null;

const resultStatus = {
    none: "NONE",
    done: "DONE",
    failed: "FAILED",
    wait: "WAIT",
    crashed: "CRASHED"
}

const Start = (dashboard) => {
    httpServer = http.createServer();

    httpServer.on('request', (req, res) => {

        req.on('error', err => {
            console.error(err);
            res.statusCode = 400;
            res.end();
        });

        let endPoint = req.url;

        if (req.method === 'GET') {
            GETEndPoints(endPoint, res, dashboard);
        }
        else {
            req.on('data', (data) => {
                body = [];
                body.push(data);
            });

            req.on('end', () => {
                let dataString = Buffer.concat(body).toString();
                jsonData = GetUrlVars("?"+dataString);

                if (req.method === 'POST') {
                    POSTEndPoint(endPoint, res, jsonData, dashboard);
                }

            });
        }

    }).listen(PORT_NUM);

    console.log("Listening to Port : " + PORT_NUM);
}

const GetUrlVars = (dataString) => {
    var vars = {};
    var parts = dataString.replace(/[?&]+([^=&]+)=([^&]*)/gi,
         (m, key, value) => {
            vars[key] = value;
        });
    return vars;
}

const GETEndPoints = (url, res, dashboard) => {

    switch (url) {
        case "/getServerInfo":

            let serverDetails = {
                ip: dashboard.udpIP,
                port: dashboard.udpPort
            }

            res.write(JSON.stringify(serverDetails));
            res.end();

            break;

        default:
            res.write('unknown endpoint!');
            res.end();
            break;

    }
}

const POSTEndPoint = (url, res, data, dashboard) => {

    switch (url) {
        case "/setServerDetails":

            if (data.passCode == null &&
                data.passCode == undefined &&
                data.passCode !== "KGHC_USER") {
                res.write("YOU_ARE_AN_INVALID_USER");
                res.end();
                return;
            }

            dashboard.serverIP = data.serverIP;
            dashboard.serverPort = data.serverPort

            res.write(JSON.stringify(resultStatus.done));
            res.end();

            console.log("INFO_POSTED : " + dashboard);

            break;

        default:
            res.write('unknown post endpoint!');
            res.end();
            break;

    }
}

module.exports = {
    Start
};