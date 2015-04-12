var express = require('express'),
	env = process.env.NODE_ENV || 'production',
	//swig	= require('swig')
	//middlewares = require('./middlewares/admin'),
	router	= require('./website/router'),
	bodyParser = require('body-parser');

var ExpressServer = function(config){
	config = config || {};

	this.expressServer = express();

	// //Middlewares
	this.expressServer.use(bodyParser.urlencoded({extended : true}));
	this.expressServer.use(bodyParser.json());
	
	// for(var middleware in middlewares){
	// 	this.expressServer.use(middlewares[middleware]);
	// }

	//Templates conf
	// this.expressServer.engine('html', swig.renderFile);
	// this.expressServer.set('view engine', 'html');
	// this.expressServer.set('views', __dirname + '/website/views/templates');
	// swig.setDefaults({
	// 	varControls : ['[[', ']]']
	// });

	if(env == 'development'){
		this.expressServer.set('view cache', false);
		console.log('dev');
		//swig.setDefaults({cache: false, varControls : ['[[', ']]']});
	}

	//Routes con router
	for(var controller in router){ //controladores incluidos en router
		for(var resource in router[controller].prototype){
			
			var method = resource.split('_')[0];
			var action = resource.split('_')[1];
			var data   = resource.split('_')[2];
			data = ( method == 'get' && data !== undefined) ? ':data' : '';
			var url = '/' + controller + '/'+ action + '/' + data;
			console.log('list of urls: '+url);
			this.router(controller, resource, method, url);
		}

	}
};
ExpressServer.prototype.router = function(controller, resource, method, url){
	this.expressServer[method](url, function(req, res, next){
		var conf = {
			'resource' : resource,
			'req' 	   : req,
			'res'	   : res,
			'next'	   : next
		}
		var Controller = new router[controller](conf);
		Controller.response();
		
	});
}
module.exports = ExpressServer;

