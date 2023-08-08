const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("second middleware!");
  res.send("<h1>Pagina Users!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("first middleware!");
  res.send("<h1>Prima risposta dal server!</h1>");
});

app.listen(3001);
