// const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const pageNotFoundController = require("./controllers/pageNotFound");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
// const db = require("./util/database");
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

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
  User.findById("65305fa5540bce43cfb8200c")
    .then((user) => {
      // In questo modo non vengono passati i metodi di user perchè va a prendere solamente i dati del database
      // req.user = user;
      // passando invece la classe new User passo anche i metodi
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
  // next();
});

//Utilizzo di rotte admin e shop
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Rotta finale diversa da quelle dei file admin e shop che porta alla pagina di errore
app.use(pageNotFoundController);

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// // BELONGSTO opposto di HASMANY ed è opzionale scrivere entrambe
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });
// sequelize
//   .sync()
//   // .sync({ force: true })
//   .then((result) => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "PrimoUser",
//         email: "test@email.com",
//       });
//     }
//     return Promise.resolve(user);
//   })
//   .then((user) => {
//     user.createCart();
//   })
//   .then((cart) => app.listen(3000))
//   .catch((err) => {
//     console.log(err);
//   });

mongoConnect(() => {
  app.listen(3000);
});
