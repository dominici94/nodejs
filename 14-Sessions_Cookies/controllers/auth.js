const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[2].trim().split("=")[1];

  // console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // NON ideale perchè dopo aver settato isLoggedIn a true la richiesta finisce nel redirect e il dato muore lì non viene salvato
  // req.isLoggedIn = true;

  // SETTING a COOKIE
  // res.setHeader("Set-Cookie", "loggedIn=true; Secure");
  User.findById("65305fa5540bce43cfb8200c")
    .then((user) => {
      // console.log(user);
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
