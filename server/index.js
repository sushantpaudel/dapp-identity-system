const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const passport = require('passport');
const logger = require('./config/logger');
const { SERVER_PORT, HTTP_SECURE, HEROKU_SERVER } = require('./config/credentials');
const app = express();
const baseUrl = '';
require('./config/scheduler');
app.use(cors());
app.use(compression());
app.use(
  helmet({
    frameguard: false,
  }),
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self' https://* http://* 'unsafe-inline' data: 'unsafe-eval'"],
      scriptSrc: ["'self' https://* http://* 'unsafe-inline' data: 'unsafe-eval'"],
    },
  }),
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(passport.initialize());
app.use((req, res, next) => {
  if (HTTP_SECURE) {
    req.apiUrl = req.protocol + 's://' + req.headers.host + baseUrl + '/';
  } else {
    req.apiUrl = req.protocol + '://' + req.headers.host + baseUrl + '/';
  }
  next();
});
require('./util/passport');
const httpStatus = require('http-status');
const { respond } = require('./util/response');
app.use(baseUrl + '/setup', require('./config/setup'));
app.use(require('./config/middleware'));
// Serve Admin Api
app.use(baseUrl + '/api', require('./api'));
// Serve Store Data
app.use(baseUrl + '/client', require('./client'));
// Serve Resources
app.use(baseUrl + '/resources', express.static('resources'));
// Serve Meta resources
app.use(baseUrl + '/meta', express.static('meta'));
// Serve Static HTML from Node.js
app.engine('html', ejs.renderFile);
// Serve frontend resources
app.use(baseUrl + '/', express.static('build'));
// Fallback for all pages except main page
// app.get(baseUrl + "/*", (req, res) =>
//   !req.xhr
//     ? res.render("static/401.html")
//     : res.send({success: false, message: "URL not found"}),
// );
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    respond(res, httpStatus.UNAUTHORIZED, err.message);
  } else {
    logger.error(err);
    respond(res, httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
});

if (SERVER_PORT) {
  app.listen(SERVER_PORT, () => console.log('Listening on PORT ' + SERVER_PORT));
} else if (HEROKU_SERVER === 'true') {
  app.listen(process.env.PORT, () => console.log('Listening on PORT ' + SERVER_PORT));
} else {
  app.listen();
}

process.on('uncaughtException', err => {
  logger.error(err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
