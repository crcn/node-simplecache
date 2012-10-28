### Features

- supports multiple transports (mongodb, redis, fs)


### Example

```javascript
var request = require("request");
var simplecache = require("simplecache").connect({
  type: "mongodb",
  connection: mongodbConnection
});

var articles = simplecache.bucket("articles");

function onContent(err, content) {
  console.log(content);
}

function loadContent(callback) {
  request("http://google.com", callback);
}

//load content the first time
articles.get({ key: "https://google.com", ttl: 3600 }, callback, loadContent);

//don't load content the second time
articles.get({ key: "https://google.com", ttl: 3600 }, callback, loadContent);
```

## API

### cacher simplecache.connect(options)

connects to the target cache transport

- `options` - needed for connecting
  - `type` - type of connection (redis, fs, mongodb)
  - `connection` - (mongodb) connection

### cache cacher.bucket(name)

returns a cache bucket

### cache.get(options, onCache, loadCache)

returns cache, or loads it if it doesn't exist

- `options` - options for finding the cached data
  - `key` - used to find the cache
  - `ttl` - time to live
- `onCache` - called if the cache exists, and loads
- `loadCahe` - called when the cache doesn't exist, or has expired

### cache.put(options, loadCache)

loads the cache

### cache.del(options, onDeleted)

removes the cache


## TODO

- redis transport
- fs transport
- aws transport (implement node-bucket)
- in-memory cache which persists to another bucket