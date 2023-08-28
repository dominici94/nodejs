const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // productCSS: true,
    // formsCSS: true,
    // activeAddProduct: true,
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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const prod = new Product(title, imageUrl, description, price);
  prod.save();

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      prod: product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
