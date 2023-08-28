const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All products",
      path: "/products",
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true,
    });
  });
};

exports.getDetailedProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    // console.log(product);
    res.render("shop/product-detail", {
      path: "/products",
      docTitle: product.title + "-" + prodId,
      prod: product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { path: "/cart", docTitle: "Your Cart" });
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

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", docTitle: "Your Orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", docTitle: "Checkout" });
};
