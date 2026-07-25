const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'chms_secret_2026', {
    expiresIn: process.env.JWT_EXPIRE || '24h'
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'chms_refresh_2026', {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  });
};

const verifyToken = (token, isRefresh = false) => {
  const secret = isRefresh
    ? (process.env.JWT_REFRESH_SECRET || 'chms_refresh_2026')
    : (process.env.JWT_SECRET || 'chms_secret_2026');
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
