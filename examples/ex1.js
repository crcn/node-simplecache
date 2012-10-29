var mongoose = require("mongoose");
var sc = require("../").connect({
	type: "mongodb",
	worker: true,
	connection: mongoose.createConnection("mongodb://localhost/simplecache-test")
});

var content = sc.bucket("content");

function onCache(err, name) {
	console.log(name);
}

function loadCache(fn) {
	console.log("loading");
	setTimeout(fn, 1, null, "craig")
}

for(var i = 4; i--;)
content.get({ key: "name2", ttl: 1000 * 5 }, onCache, loadCache);
content.get({ key: "name3", ttl: 1000 * 5 }, onCache, loadCache);
content.get({ key: "name3", ttl: 1000 * 5 }, onCache, loadCache);