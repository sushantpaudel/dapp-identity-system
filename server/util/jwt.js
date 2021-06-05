const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/credentials');

module.exports.hash = (password, callback) => {
  bcrypt.hash(password, 10, callback);
};

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
};

module.exports.hashSync = password => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

module.exports.comparePasswordSync = async (password, hash) => {
  const isSame = bcrypt.compareSync(password, hash);
  return isSame;
};

const generateJWT = user => {
  const expireAfter = 12 * 60 * 60; // **IN SECONDS**
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleIds: user.roleIds,
      exp: parseInt(new Date().getTime() / 1000 + expireAfter, 10),
    },
    JWT_SECRET,
  );
};

module.exports.toAuthJSON = function (user) {
  return {
    id: user.id,
    username: user.username,
    token: generateJWT(user),
  };
};
