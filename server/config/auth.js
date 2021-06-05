const jwt = require('express-jwt');
const { JWT_SECRET } = require('./credentials');

const getTokenFromHeaders = req => {
  let [admin, customer] = [null, null];
  const {
    headers: { authorization },
  } = req;
  if (authorization) {
    tokens = authorization.split(',');
    tokens.forEach(t => {
      const [bearer, token] = t.split(' ');
      switch (bearer) {
        case 'Admin':
          admin = token;
          break;
        case 'Customer':
          customer = token;
          break;
        default:
          break;
      }
    });
  }
  return {
    admin,
    customer,
  };
};

const getToken = {
  admin: req => getTokenFromHeaders(req).admin,
  customer: req => getTokenFromHeaders(req).customer,
};

const auth = {
  required: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getToken.admin,
    algorithms: ['HS256'],
  }),
  optional: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getToken.admin,
    credentialsRequired: false,
    algorithms: ['HS256'],
  }),
  customer: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getToken.customer,
    algorithms: ['HS256'],
  }),
  getToken: getTokenFromHeaders,
};

module.exports = auth;
