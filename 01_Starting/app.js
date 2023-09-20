// const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const pageNotFoundController = require("./controllers/pageNotFound");
// const db = require("./util/database");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

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

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//Utilizzo di rotte admin e shop
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Rotta finale diversa da quelle dei file admin e shop che porta alla pagina di errore
app.use(pageNotFoundController);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// BELONGSTO opposto di HASMANY ed è opzionale scrivere entrambe
User.hasMany(Product);

sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "PrimoUser",
        email: "test@email.com",
      });
    }
    return Promise.resolve(user);
  })
  .then((user) => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
