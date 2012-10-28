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

### 


## TODO

- redis transport
- fs transport