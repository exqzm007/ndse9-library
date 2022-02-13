module.exports = (req, res) => {
    res.render("pages/404", { user: req.user });
}