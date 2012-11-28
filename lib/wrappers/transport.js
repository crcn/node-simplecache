var structr = require("structr"),
Bucket = require("./bucket");

module.exports = structr({

	/**
	 */

	"__construct": function(transport) {
		this._transport = transport;
		this._buckets = [];
	},

	/**
	 */

	"bucket": function(name) {
		return this._buckets[name] || (this._buckets[name] = new Bucket(this._transport.bucket(name || "default")));
	}
});