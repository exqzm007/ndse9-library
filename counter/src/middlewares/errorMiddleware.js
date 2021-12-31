module.exports = (req, res) => {
  res.status(404).json({ errmessage: "Not found;" })
};
