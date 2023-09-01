const Product = require("../models/product");
const Cart = require("../models/cart");
const sequelize = require("../util/database");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

  // Product.fetchAll()
  //   .then(([rows, _]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       docTitle: "All products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     docTitle: "All products",
  //     path: "/products",
  //     // hasProducts: products.length > 0,
  //     // activeShop: true,
  //     // productCSS: true,
  //   });
  // });
};

exports.getDetailedProduct = (req, res, next) => {
  const prodId = req.params.productId;

  // findByPk => metodo di sequelize per il Model
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        path: "/products",
        docTitle: product.title + "-" + prodId,
        prod: product,
      });
    })
    .catch((err) => console.log(err));

  // Product.findById(prodId)
  //   .then(([product]) => {
  //     res.render("shop/product-detail", {
  //       path: "/products",
  //       docTitle: product[0].title + "-" + prodId,
  //       prod: product[0],
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findById(prodId, (product) => {
  //   // console.log(product);
  //   res.render("shop/product-detail", {
  //     path: "/products",
  //     docTitle: product.title + "-" + prodId,
  //     prod: product,
  //   });
  // });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));

  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render("shop/index", {
  //     prods: rows,
  //     docTitle: "Shop",
  //     path: "/",
  //   });
  // });

  // Product.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     docTitle: "Shop",
  //     path: "/",
  //     // hasProducts: products.length > 0,
  //     // activeShop: true,
  //     // productCSS: true,
  //   });
  // });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  // res.render("shop/cart", { path: "/cart", docTitle: "Your Cart" });
  const prodId = req.body.productId;
  // console.log(prodId);
  Product.findById(prodId, (prod) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.redirect("/cart");
};

exports.postDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", docTitle: "Your Orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", docTitle: "Checkout" });
};
