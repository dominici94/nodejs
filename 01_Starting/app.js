const http = require("http");

const routes = require("./routes");

// function rqListener(req, res) {}

// const server = http.createServer(rqListener);

const server = http.createServer(routes);

server.listen(3000);
