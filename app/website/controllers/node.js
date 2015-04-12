 //ArticleView = require('../views/article'),
 var NodeModel = require('../models/node');

 var Node = function(conf){
 	this.conf = conf || {};

	//this.view = new ArticleView();
	this.model = new NodeModel();

	//response to request
	this.response = function(){
		console.log('response '+this.conf.resource);
		this[this.conf.resource](this.conf.req, this.conf.res, this.conf.next)
	}
};
Node.prototype.post_create = function(req,res,next){
	var data = req.body;
	console.log(data);
	this.model.create(data, function(doc){
		res.send('Saved!');
	});
};
Node.prototype.get_readAll = function(req, res, next){
	var object = {};
	var self = this;
	this.model.readAll(req, res, function(doc){
		//object.node = doc;
		doc.forEach(function(node, index){
			console.log('record found '+index + node._id);
			object[++index] = node;
		});
		var result;
		if(object.length === 0){
			result = "No results";
			console.log(result);
			res.send(result);
		}
		else
		{
			console.log(object);
			res.json(object);
		}
	});
}
Node.prototype.put_update_data = function(req, res, next){
	var object 	 = {},
	self 	 = this;
	id_to_change = { _id : req.body.id_change },
	new_data = req.body.values;
	console.log('idCh'+id_to_change);
	console.log(new_data);
	this.model.update(id_to_change, new_data, function(doc){
		//object.article = doc[0];
		console.log('getIndiv '+doc[0]);
		//self.view.edit(res, object);
	});
}
Node.prototype.delete_delete_data = function(req, res, next){
	var model = this.model;
	var object 	 = {},
	self 	 = this,
	id_to_delete = { id : req.body.id_to_delete };
	
	model.delete(id_to_delete, function(doc){
		if(! doc ){
			var msg = 'not found with id '+ id_to_delete;
			console.log(msg);
			res.send(msg);
		}
		else {
			//
			console.log('record found and deleted: ');
			res.send('record found and deleted');
		}
	});
}
Node.prototype.get_search_data = function(req, res, next){
	var object = {};
	var self = this;
	var id = req.params.data;
	var query = {_id : id};
	//var query = {"._id" : id};
	console.log(id);
	this.model.read(query, function(doc){
		if(!doc.length){
			var msg = 'not found with id '+ id;
			console.log(msg);
			res.send(msg);
		}
		else {
			object.node = doc[0];
			console.log('record found: '+object.node);
			res.json(object.node);
		}
		//object.node = doc[0];
		//self.view.see(res, object);
		
		//res.send(object.node);
	});
}

module.exports = Node;