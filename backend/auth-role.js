function checkRole(role) {
  return async (req, res, next) => {
    if (req.session.userData && req.session.userData.role === role) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
}

module.exports = checkRole;
