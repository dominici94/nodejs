// const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const pageNotFoundController = require("./controllers/pageNotFound");

// Utilizzo di applicazione con express
const app = express();

// Utilizzo di Handlebars come template engine
/* app.engine(
  "handlebars",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    // extname: "handlebars",
  })
);
app.set("view engine", "handlebars");
*/

// Utilizzo di pug come template engine
// app.set("view engine", "pug");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
// const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Utilizzo di rotte admin e shop
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Rotta finale diversa da quelle dei file admin e shop che porta alla pagina di errore
app.use(pageNotFoundController);

app.listen(3000);
