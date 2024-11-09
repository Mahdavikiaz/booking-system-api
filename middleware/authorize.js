const authorize = (roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({
      error: 'Forbidden: User is not authenticated or role is missing.',
    });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      error: 'Forbidden: You do not have permission to access this resource.',
    });
  }

  next();
};

module.exports = authorize;
