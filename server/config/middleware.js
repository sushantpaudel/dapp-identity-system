const auth = require('./auth');
const middleware = require('express').Router();
const jwt = require('jsonwebtoken');

/**
 * Middleware to append req.body with createdBy field in all post routes.
 */
middleware.post('/api/*', (req, res, next) => {
  const headers = auth.getToken(req).admin;
  const decoded = jwt.decode(headers);
  req.body.createdBy = decoded ? decoded.id : 0;
  next();
});

/**
 * Middleware to append req.body with editedBy field in all put routes.
 */
middleware.put('/api/*', (req, res, next) => {
  const headers = auth.getToken(req).admin;
  const decoded = jwt.decode(headers);
  req.body.editedBy = decoded ? decoded.id : 0;
  next();
});

/**
 * Middleware to append req.body with editedBy field in all delete routes.
 */
middleware.delete('/api/*', (req, res, next) => {
  const headers = auth.getToken(req).admin;
  const decoded = jwt.decode(headers);
  req.body.editedBy = decoded ? decoded.id : 0;
  next();
});

module.exports = middleware;
