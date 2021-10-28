const http = require('http');
const getPublicIP = require('./getMyPublicIP.js');

const PORT_NUM = process.env.PORT || 41234;

const Start = () => {

    http.createServer(function (req, res) {
        let endPoint = req.url;
        EndPoints(endPoint, res);
    }).listen(PORT_NUM);

}

const EndPoints = (url, res) => {

    switch (url) {
        case "/getip":
            getPublicIP.WhatsMyIpAddress((ipRes, err) => {
                if(ipRes) {
                    res.write(ipRes);
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