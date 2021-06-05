const { User, UserRole } = require('../models');
const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword, toAuthJSON } = require('./jwt');

passport.use(
  'admin-login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await User.findOne({
        raw: true,
        where: {
          username,
          type: 'admin',
        },
      });
      if (user && user.loginAttemptsCount) {
        const userRoles = await UserRole.findAll({
          where: { userId: user.id },
          attributes: ['roleId'],
        });
        const roleIds = [];
        userRoles.forEach(userRole => {
          roleIds.push(userRole.roleId);
        });
        user.roleIds = roleIds || [];
        comparePassword(password, user.password, (err, isSame) => {
          if (err) return done(err);
          if (isSame) {
            User.update({ loginAttemptsCount: user.loginAttempts }, { where: { id: user.id } });
            return done(null, { ...toAuthJSON(user), roleIds });
          } else {
            User.update({ loginAttemptsCount: user.loginAttemptsCount - 1 }, { where: { id: user.id } });
            return done(null, false, {
              message: 'User and Password does not match',
            });
          }
        });
      } else {
        return done(null, false, { message: 'User not found' });
      }
    },
  ),
);

passport.use(
  'client-login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user =
        (await User.findOne({
          raw: true,
          where: {
            username,
            type: 'client',
          },
          attributes: ['loginAttemptsCount', 'loginAttempts', 'id', 'password', 'username', 'email'],
        })) ||
        (await User.findOne({
          raw: true,
          where: {
            email: username,
            type: 'client',
          },
          attributes: ['loginAttemptsCount', 'loginAttempts', 'id', 'password', 'username', 'email'],
        }));
      if (user && user.loginAttemptsCount) {
        comparePassword(password, user.password, (err, isSame) => {
          if (err) return done(err);
          if (isSame) {
            User.update({ loginAttemptsCount: user.loginAttempts }, { where: { id: user.id } });
            return done(null, toAuthJSON(user));
          } else {
            User.update({ loginAttemptsCount: user.loginAttemptsCount - 1 }, { where: { id: user.id } });
            return done(null, false, { message: 'Wrong credentials' });
          }
        });
      } else {
        return done(null, false, { message: 'User not found' });
      }
    },
  ),
);

passport.use(
  'google-login',
  new CustomStrategy(async (req, done) => {
    const userInfo = req.body.userInfo;
    const user = userInfo.user;
    let userDb = await User.findOne({
      where: { email: user.email, type: 'client' },
      attributes: ['loginAttemptsCount', 'loginAttempts', 'id', 'password', 'username', 'email'],
    });
    if (!userDb) {
      userDb = await User.create({
        username: user.email.split('@')[0],
        email: user.email,
        firstName: user.givenName,
        type: 'client',
      });
    } else {
      await User.update(
        {
          loginAttemptsCount: userDb.loginAttempts,
        },
        { where: { email: user.email, type: 'client' } },
      );
    }
    done(null, toAuthJSON(userDb));
  }),
);
