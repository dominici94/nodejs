// const http = require("http");

const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next(); // Permette alla richiesta di continuare al prossimo middleware
// });

app.use("/add-product", (req, res, next) => {
  console.log("In a middleware!");
  // ...
  res.send("<h1>Add Product Page!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  // ...
  res.send("<h1>Hello from express!</h1>");
});

// const routes = require("./routes");
// const server = http.createServer(routes);

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
