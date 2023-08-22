const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // if (req.body.title === "") {
  //   return res.status(409).render("page-not-found", {
  //     docTitle: "409: Input Error",
  //     path: "/error",
  //     numberError: 409,
  //     error: "Title must have at least one carachter!",
  //   });
  // }
  const prod = new Product(req.body.title);
  prod.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
