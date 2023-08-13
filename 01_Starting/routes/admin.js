const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true,
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  if (req.body.title === "") {
    return res.status(409).render("page-not-found", {
      docTitle: "409: Input Error",
      numberError: 409,
      error: "Title must have at least one carachter!",
    });
  }
  products.push({
    title: req.body.title,
  });
  res.redirect("/");
});

// module.exports = router;
exports.routes = router;
exports.products = products;
