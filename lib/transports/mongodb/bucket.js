var structr = require("structr"),
outcome = require("outcome");

module.exports = structr({

	/**
	 */

	"__construct": function(Cache) {
		this.Cache = Cache;
	},

	/**
	 */

	"get": function(options, loadCache, onCache) {
		var self = this;

		function putCache() {
			self.put(options, loadCache, onCache);
		}

		this.Cache.findOne({ key: options.key }, function(err, cache) {
			if(cache) {
				if(cache.expired()) {
					return self.del({ key: options.key }, putCache);
				} else {
					return onCache.apply(null, cache.data);
				}
			} else {
				putCache();
			}
		});
	},

	/**
	 */

	"put": function(options, loadCache, onPut) {
		var cache = new this.Cache(options);
		loadCache(function() {
			cache.data = Array.prototype.slice.call(arguments, 0);
			cache.save(function() {
				onPut.apply(null, cache.data);
			});
		});
	},

	/**
	 */

	"del": function(options, onDel) {
		this.Cache.collection.remove(options, { multi: true }, onDel);
	},

	/**
	 */

	"removeExpired": function() {
		this.Cache.collection.remove({ expiresAt: {$lt: new Date() }}, { multi: true });
	}
});	