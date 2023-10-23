exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[2].trim().split("=")[1];

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // NON ideale perchè dopo aver settato isLoggedIn a true la richiesta finisce nel redirect e il dato muore lì non viene salvato
  // req.isLoggedIn = true;

  res.setHeader("Set-Cookie", "loggedIn=true; Secure");
  res.redirect("/");
};
