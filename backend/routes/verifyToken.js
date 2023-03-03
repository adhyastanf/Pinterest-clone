const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json('token is invalid');
      }
      req.user = user;
      next();
    });
  } else {
    return res.staus(401).json('you are not authenticated');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not alowed to do that!');
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization };
