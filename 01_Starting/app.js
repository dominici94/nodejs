// const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

// Utilizzo di applicazione con express
const app = express();

// Utilizzo di Handlebars come template engine
app.engine(
  "handlebars",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    // extname: "handlebars",
  })
);
app.set("view engine", "handlebars");
app.set("views", "views");

// Utilizzo di pug come template engine e va a prendere i file nella cartella views
// app.set("view engine", "pug");
// app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Utilizzo di rotte admin e shop
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// Rotta finale diversa da quelle dei file admin e shop che porta alla pagina di errore
app.use((req, res, next) => {
  res
    .status(404)
    .render("page-not-found", {
      docTitle: "404: Page Not Found!",
      numberError: 404,
      error: "Page Not Found",
    });
  // .sendFile(path.join(__dirname, "views", "page-not-found.html"));
});

app.listen(3000);
