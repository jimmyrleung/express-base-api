const { jwt } = require('../util');

// TODO: Implement routes strategy using db + cache
const publicRoutes = ['/login'];

const authentication = (req, res, next) => {
  if (publicRoutes.includes(req.path)) return next();

  const auth = req.headers.authorization;

  if (!auth) {
    req.logger.error(`${req.method} ${req.originalUrl} | Unauthorized: Missing 'Authorization' header.`);
    return res.status(401).json({ message: 'Missing \'Authorization\' header.' });
  }

  const { decoded, valid } = jwt.verify(auth);

  if (!valid) {
    req.logger.error(`${req.method} ${req.originalUrl} | Unauthorized: Invalid or expired token.`);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  req.logger.info(`${req.method} ${req.originalUrl} | Authorized for: ${decoded._id} | ${decoded.name} | ${decoded.email}`);

  req.user = {
    _id: decoded._id,
    name: decoded.name,
    email: decoded.email,
  };

  return next();
};

module.exports = authentication;
