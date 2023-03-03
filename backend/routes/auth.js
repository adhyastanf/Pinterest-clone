const User = require('../model/User');

const dotenv = require('dotenv');
const CryptoJS = require('crypto-js');
const router = require('express').Router();

const jwt = require('jsonwebtoken');
dotenv.config();

// generate token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isUser: user.isUser,
    },
    process.env.JWT_SEC,
    { expiresIn: '10d' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isUser: user.isUser }, 'myRefreshSecretKey');
};

// refresh token
let refreshTokens = [];

// verifyt token
const verify = (req, res, next) => {
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

// refresh token
router.post('/refresh', (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json('You are not authenticated!');
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json('Refresh token is not valid!');
  }
  jwt.verify(refreshToken, 'myRefreshSecretKey', (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);2
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

// register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS).toString(),
  });

  try {
    const saveUser = await newUser.save();
    return res.status(201).json(saveUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      // password: req.body.password
    });

    if (!user) {
      return res.status(401).send('Username salah');
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPasword = req.body.password;

    if (originalPassword != inputPasword) {
      return res.status(401).json('password salah');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    const { password, ...others } = user._doc;
    return res.status(201).json({ ...others, accessToken, refreshToken });
  } catch (err) {
    return res.status(500).json('tidak ada akun');
  }
});

// delete
router.delete('/delete/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isUser) {
    return res.status(200).json('User has been deleted.');
  }
  return res.status(403).json('You are not allowed to delete this user!');
});

// logout
router.post('/logout', verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json('You logged out successfully.');
});

module.exports = router;
