var structr = require("structr"),
EventEmitter = require("events").EventEmitter;

module.exports = structr({

	/**
	 */

	"__construct": function(bucket) {
		this._bucket = bucket;
		this._fetching = {};
	},

	/**
	 */

	"get": function(options, onCache, loadCache) {

		var ops = this._ops(options),
		key = ops.key, em = this._em, self = this;

		//loading?
		if(this._fetching[key]) {
			this._fetching[key].onCache.push(onCache);
			return;
		}

		var fetching = this._fetching[key] = {
			onCache: [onCache]
		}

		self._bucket.get(ops, function() {
			var args = arguments;
			fetching.onCache.forEach(function(onCache) {
				onCache.apply(null, args);
			})
			delete self._fetching[key];
		}, function(callback) {
			loadCache(function() {
				callback.apply(null, arguments);
			})
		});
	},

	/**
	 */

	"put": function(options, loadCache, onPut) {
		this._bucket.put(this._ops(options), loadCache, onPut || function(){});
	},

	/**
	 */

	"del": function(options, onDel) {
		this._bucket.del(this._ops(options), onDel);
	},

	/**
	 */

	"_ops": function(options) {
		var ops;

		if(typeof options == "string") {
			ops = { key: options };
		} else {
			ops = options;
		}

		return ops;
	}
});
