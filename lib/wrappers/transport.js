var structr = require("structr"),
Bucket = require("./bucket");

module.exports = structr({

	/**
	 */

	"__construct": function(transport) {
		this._transport = transport;
	},

	/**
	 */

	"bucket": function() {
		return new Bucket(this._transport.bucket.apply(this._transport, arguments));
	}
});