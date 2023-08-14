const express = require("express");
const router = express.Router();

const adminData = require("./indexRoutes");

router.get("/", (req, res, next) => {
  res.render("users.ejs", {
    documentTitle: "Users Page",
    users: adminData.usernames,
  });
});

module.exports = router;
