const router = require('express').Router();
const auth = require('../../config/auth');
const passport = require('passport');
const { User } = require('../../models');

router.get('/my-profile', auth.customer, async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.payload.id },
    attributes: ['username', 'email', 'phoneNumber', 'gender', 'dateOfBirth', 'firstName', 'lastName'],
  });
  res.send(user);
});

router.get('/authorize', auth.customer, async (req, res, next) => {
  res.send({
    user: {
      isAuthenticated: true,
    },
    permissions: {
      isAdmin: true,
      user: 3,
      role: 3,
    },
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('client-login', {}, (err, response, info) => {
    if (err) res.status(500).send(err);
    if (response) {
      res.send({
        user: {
          ...response,
          isAuthenticated: true,
        },
      });
    } else {
      res.status(500).send(info);
    }
  })(req, res, next);
});

router.post('/login/google', (req, res, next) => {
  passport.authenticate('google-login', {}, (err, response, info) => {
    if (err) res.status(500).send(err);
    if (response) {
      res.send({
        user: {
          ...response,
          isAuthenticated: true,
        },
      });
    } else {
      console.log(info);
      res.status(500).send(info);
    }
  })(req, res, next);
});

module.exports = router;
