var mongoose = require("mongoose"),
Schema       = mongoose.Schema;


var Cache = new Schema({
	ttl: { type: Number, default: -1 },
	key: { type: String, index: { unique: true }},
	data: {},
	expiresAt: Date,
	createdAt: { type: Date, default: Date.now }
});

Cache.pre("save", function(next) {
	if(~this.ttl) {
		this.expiresAt = new Date(Date.now() + this.ttl);
	}
	next();
});

Cache.methods.expired = function() {
	return this.expiresAt ? (this.expiresAt.getTime() < Date.now()) : false;
}

module.exports = Cache;