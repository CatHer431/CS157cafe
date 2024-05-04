function checkRole(role) {
  return async (req, res, next) => {
    if (req.session.user && role.includes(req.session.user.role)) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
}

module.exports = checkRole;
