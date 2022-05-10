module.exports = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.messgae });

  return res.status(500).json({ message: 'Internal Server Error' });
};
