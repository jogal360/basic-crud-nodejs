var https    = require('https'),
	http 	 = require('http'),
	expressServer = require('./app/expressServer'),
	mongoose = require('mongoose'),
	conf     = require('./conf'),
	fs	     = require('fs'),
	tls 	 = require('tls');

mongoose.connect('mongodb://'+conf.mongoDB.host +'/'+conf.mongoDB.dbname, function(err){
	if(err){
		console.log('Fail', err)
	}else{
		console.log('Connected');
	}
});

var options = {
	key  : fs.readFileSync('./test-key.pem'),
	cert : fs.readFileSync('./test-cert.pem')
};

var app = new expressServer();

var serverhttp = http.createServer(app.expressServer).listen(conf.connection.portHttp);
var serverhttps = https.createServer(options, app.expressServer).listen(conf.connection.portHttps);

