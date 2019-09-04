const { jwt } = require('../util');

// TODO: Implement routes strategy using db + cache
const publicRoutes = ['/login'];

const authentication = (req, res, next) => {
  if (publicRoutes.includes(req.path)) return next();

  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: 'Missing \'Authorization\' header.' });
  }

  const { decoded, valid } = jwt.verify(auth);

  if (!valid) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  req.user = {
    _id: decoded._id,
    name: decoded.name,
    email: decoded.email,
  };

  return next();
};

module.exports = authentication;
