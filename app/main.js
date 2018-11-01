const http = require('http')
const express = require('express')
const https = require('https')
const consts = require(global.appDir+'/app/consts')



global.config = require(global.appDir+'/conf/config.js');


const app = express();
const httpServer = http.Server(app);

// if(global.config.https){
// 	const httpsOptions = {
// 		key: fs.readFileSync(global.config.sslKey),
// 		cert: fs.readFileSync(global.config.sslCrt),
// 		requestCert: false,
// 		rejectUnauthorized: false
// 	};
// 	var httpsServer = https.createServer(httpsOptions, app);

// 	httpsServer.listen(global.config.httpsPort);
// }
httpServer.listen(global.config.httpPort);

const root = require(global.appDir+'/app/routers/root');
root(app);


console.log('Running', new Date().toLocaleString());

