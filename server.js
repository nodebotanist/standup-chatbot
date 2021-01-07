const http = require('http');
const app = require('./app');
let port = 8080;
var server = http.createServer(app);
server.listen(port, function() {
  console.log(`${port} is opened`);
});