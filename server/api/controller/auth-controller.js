const logger = require('../../config/logger');
const passport = require('passport');
const { getPermissions } = require('../util/role');
const { User, Role } = require('../../models');

class AuthController {
  static async authorize(req, res, next) {
    const permissions = await getPermissions(req.payload.roleIds || []);
    const user = await User.findOne({
      raw: true,
      where: { id: req.payload.id },
      attributes: ['firstName', 'lastName'],
    });
    const roles = req.payload.roleIds
      ? await Promise.all(
          req.payload.roleIds.map(roleId => Role.findOne({ where: { id: roleId }, attributes: ['name'] })),
        )
      : [];
    if (user) {
      res.send({
        user: {
          ...user,
          roles,
          isAuthenticated: true,
        },
        permissions: permissions,
      });
    } else {
      res.status(500).send();
    }
  }
  static async login(req, res, next) {
    passport.authenticate('admin-login', {}, async (err, response, info) => {
      if (err) {
        logger.error(err);
        res.status(500).send(err);
      }
      if (response) {
        const permissions = await getPermissions(response.roleIds || []);
        res.send({
          success: true,
          user: {
            ...response,
            isAuthenticated: true,
          },
          permissions: permissions,
        });
      } else {
        logger.error(info);
        res.send(info);
      }
    })(req, res, next);
  }
  static async logout(req, res, next) {}
}

module.exports = AuthController;
