module.exports = (req, res, next) => {
  res.status(404).render("page-not-found", {
    docTitle: "404: Page Not Found!",
    path: null,
    numberError: 404,
    error: "Page Not Found",
  });
};
