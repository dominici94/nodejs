const express = require("express");
const router = express.Router();

const usernames = [];

router.get("/", (req, res, next) => {
  res.render("index.ejs", { documentTitle: "Home Page" });
});

router.post("/users", (req, res, next) => {
  usernames.push({ username: req.body.username });
  // const userName = req.body.username;
  res.redirect("/users");
});

// module.exports = router;
exports.routes = router;
exports.usernames = usernames;
