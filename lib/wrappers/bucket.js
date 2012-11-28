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

	"get": function(options, loadCache, onCache) {

		var ops = this._ops(options),
		key = ops.key, em = this._em, self = this;

		//loading?
		if(this._fetching[key]) {
			this._fetching[key].onCache.push(onCache);
			return;
		}

		var fetching = this._fetching[key] = {
			onCache: [onCache]
		};


		function onCache2() {
			var args = arguments;
			fetching.onCache.forEach(function(onCache) {
				onCache.apply(null, args);
			});
			delete self._fetching[key];
		}

		function loadCache2(onLoad) {
			loadCache(function() {
				onLoad.apply(null, arguments);
			});

			return { dispose: function(){ } };
		}

		//no ttl? don't cache, just combine methods
		if(options.ttl == 0) {
			return loadCache2(onCache2);
		}

		self._bucket.get(ops, loadCache2, onCache2);


		return {
			dispose: function(callback) {
				self._bucket.del({ key: ops.key }, callback);
			}
		}
	},

	/**
	 */

	"put": function(options, loadCache, onPut) {
		this._bucket.put(this._ops(options), loadCache, onPut || function(){});
	},

	/**
	 */

	"del": function(options, onDel) {
		this._bucket.del(this._ops(options), onDel || function(){});
	},

	/**
	 */

	"_ops": function(options) {
		var ops;

		if(typeof options == "string") {
			ops = { key: options, ttl: 0 };
		} else {
			ops = options;
		}

		return ops;
	}
});
