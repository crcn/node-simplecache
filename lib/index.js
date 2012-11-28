var Wrapper = require("./wrappers/transport");

var transports = {
	mongodb: require("./transports/mongodb")
};

exports.connect = function(options) {
	var Transport = transports[options.type];
	if(!Transport) throw new Error("transport \""+ options.type + "\" doesn't exist");
	return new Wrapper(new Transport(options));
}

exports.plugin = function(loader) {

	var params = loader.params("simplecache");
	
	if(params.type == "mongodb") {
		params.connection = loader.module("plugin-mongodb");
	}

	return exports.connect(params);
}