var shemaNode = require('./schema/node');

var Node = function(conf){
	conf = conf || {};
	this.model = shemaNode;

};
Node.prototype.create = function(data, callback){
	this.model.create(data, function(err, data){
		if(err) throw err;
		console.log('data saved: ' + data);
		callback(data);
	});
}
Node.prototype.read = function(query, callback){
	//debugger;
	this.model.find(query).exec(function(err,doc){
		if(err) throw err;
		callback(doc);
	})
};
Node.prototype.update = function(query, query2, callback){
	var model = this.model;
	model.findOneAndUpdate(query, query2, function(err,doc){
		console.log('doc'+doc);

		if(err) throw err;

		callback(doc);
		
	})
}
Node.prototype.delete = function(query, callback){
	var model = this.model;
	model.findOneAndRemove(query, function(err,doc){
		
		if(err) throw err;
		
		callback(doc);

		//callback('deleted! :)' + query.id);
})
};
Node.prototype.readAll = function(req, res, callback){
	//debugger;
	this.model.find({}).exec(function(err,data){
		if(err) throw err;//res.send(500, err.message);
		callback(data);
	})
};

module.exports = Node;