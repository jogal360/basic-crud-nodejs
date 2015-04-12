var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var nodeSchema = new Schema({
	type_node : String, 
	link : [{
		type_link : String,
		src_id : Number,
		tgt_id : Number
	}]
});

var Node = mongoose.model('Node', nodeSchema);


module.exports = Node;