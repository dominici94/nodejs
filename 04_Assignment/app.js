const express = require("express");
const bodyParser = require("body-parser");

const indexData = require("./routes/indexRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view-engine", "ejs");
// app.set('views', 'views');

app.use(express.static("public"));

app.use("/", indexData.routes);

app.use("/users", adminRoutes);

app.listen(3000);
