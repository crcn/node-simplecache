var structr = require("structr"),
Cache       = require("./schema"),
Bucket      = require("./bucket");

module.exports = structr({

	/**
	 */

	"__construct": function(options) {
		this.connection = options.connection;
		this._buckets   = {};
		this.ttl = options.ttl || 1000 * 20;
		if(options.worker) this._startDumpJob();
	},

	/**
	 */

	"bucket": function(name) {
		return this._buckets[name] || (this._buckets[name] = new Bucket(Cache.model(this.connection, "cache." + name)));
	},

	/**
	 * dumps expired keys
	 */

	"_startDumpJob": function() {
		var self = this;
		setInterval(function() {
			for(var name in self._buckets) {
				self._buckets[name].removeExpired();
			}
		}, this.ttl);
	}
});