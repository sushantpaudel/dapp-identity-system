const Op = require('sequelize').Op;
const httpStatus = require('http-status');
const logger = require('../../config/logger');
const { deleteItem } = require('../../config/delete');
const { User, UserRole, UserAddress, Address, VerificationCode } = require('../../models');
const { hashSync, comparePasswordSync } = require('../../util/jwt');
const { updateAddress, createAddress } = require('../util/address');
const db = require('../../models');
const { getPagination, getPagingData } = require('../util/pagination');
const { respond } = require('../../util/response');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../util/verification-code');
const { VERIFICATION_CODE_TYPES } = require('../../util/values');

const TYPE = 'admin';
class UserController {
  static async getAll(req, res) {
    const { pageNumber, pageSize, searchString } = req.query;
    const { limit, offset } = getPagination(pageNumber, pageSize);
    User.hasMany(UserRole);
    const users = await User.findAndCountAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'createdAt', 'updatedAt'],
      include: [
        {
          model: UserRole,
          attributes: ['roleId'],
        },
      ],
      limit,
      offset,
      where: {
        isDeleted: false,
        type: TYPE,
        username: { [Op.not]: 'superadmin' },
        [Op.or]: [
          { firstName: { [Op.startsWith]: `${searchString}` } },
          { lastName: { [Op.startsWith]: `${searchString}` } },
          { email: { [Op.startsWith]: `${searchString}` } },
          { username: { [Op.startsWith]: `${searchString}` } },
        ],
      },
    });
    const paginatedUsers = await getPagingData(users, pageNumber, limit, offset);
    respond(res, httpStatus.OK, 'User List', paginatedUsers);
  }
  static async getOne(req, res) {
    User.hasMany(UserRole);
    User.hasMany(UserAddress);
    UserAddress.belongsTo(Address);
    User.findOne({
      where: { id: req.params.id, type: TYPE },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: UserRole,
          attributes: ['roleId'],
        },
        {
          model: UserAddress,
          include: [
            {
              model: Address,
              attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
    })
      .then(user => {
        respond(res, httpStatus.OK, 'User Data', user);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Server Error!!');
      });
  }
  static async post(req, res) {
    try {
      const user = req.body;
      const addressDetail = {
        country: req.body.country,
        city: req.body.city,
        region: req.body.region,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        zipCode: req.body.zipCode,
        createdBy: req.body.createdBy,
      };
      user.password = hashSync(user.password);
      db.sequelize
        .transaction(async t => {
          const userDb = await User.create(user, { transaction: t });
          if (user.roleId) {
            await UserRole.create({ userId: userDb.id, roleId: user.roleId }, { transaction: t });
          }
          await createAddress(UserAddress, userDb.id, 'userId', addressDetail, t);
          return userDb;
        })
        .then(user => {
          sendVerificationEmail({ id: user.id, email: user.email }, req.apiUrl).catch(err => logger.error(err));
          respond(res, httpStatus.OK, 'User successfully Created');
        });
    } catch (err) {
      logger.error(err);
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error in creating user');
    }
  }
  static async put(req, res) {
    let user = req.body;
    const addressDetail = {
      country: req.body.country,
      city: req.body.city,
      region: req.body.region,
      addressLineOne: req.body.addressLineOne,
      addressLineTwo: req.body.addressLineTwo,
      zipCode: req.body.zipCode,
      createdBy: req.body.createdBy,
      editedBy: req.body.editedBy,
    };
    if (user.password) {
      user.password = hashSync(user.password);
    }
    try {
      await db.sequelize.transaction(async t => {
        await UserRole.destroy({ where: { userId: user.id }, transaction: t });
        await updateAddress(UserAddress, user.id, 'userId', addressDetail, t);
        await User.update(user, { where: { id: user.id, type: TYPE }, transaction: t });
        await UserRole.create({ userId: user.id, roleId: user.roleId }, { transaction: t });
      });
      respond(res, httpStatus.OK, 'User successfully updated');
    } catch (err) {
      logger.error(err);
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error in updating user');
    }
  }
  static async delete(req, res) {
    deleteItem(User, req.params.id, req.payload)
      .then(() => {
        respond(res, httpStatus.OK, 'User Successfully deleted');
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error in deleting user');
      });
  }
  /**
   * POST:
   *  /user/change-password
   * BODY:
   *  password - user's old password to authenticate while changing password
   *  newPassword - new password user wants to change to
   */
  static async changePassword(req, res) {
    const userId = req.payload.id;
    const { password, newPassword } = req.body;
    if (password && newPassword) {
      const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'password'] });
      const isAuthenticated = await comparePasswordSync(password, user.password);
      if (isAuthenticated) {
        const newPasswordHash = await hashSync(newPassword);
        await User.update({ password: newPasswordHash }, { where: { id: userId } });
        respond(res, httpStatus.OK, 'Successfully changed the password.');
      }
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, `You've entered the wrong password`);
    }
    respond(res, httpStatus.INTERNAL_SERVER_ERROR, `Missing credentials`);
  }
  /**
   * post
   */
  static async forgotPassword(req, res) {
    const { email } = req.body;
    const isUser =
      (await User.findOne({
        attributes: ['email', 'id'],
        where: { isDeleted: false, type: TYPE, email: email.trim() },
      })) ||
      (await User.findOne({
        attributes: ['email', 'id'],
        where: { isDeleted: false, type: TYPE, username: email.trim() },
      }));
    if (!isUser) {
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'User not found!!');
    } else {
      sendPasswordResetEmail({ email: isUser.email, id: isUser.id }, req.apiUrl)
        .then(() => {
          respond(res, httpStatus.OK, 'Email sent. Please check your email.');
        })
        .catch(err => {
          logger.error(err);
          res.status(500).send({
            success: false,
            message: 'Error!!',
          });
        });
    }
  }

  static async verify(req, res) {
    const type = req.query._type;
    const code = req.query._code;
    VerificationCode.findOne({
      attributes: ['id', 'userId'],
      where: {
        type,
        code,
        expiryDate: { [Op.gte]: Date.now() },
        isUsed: false,
      },
    })
      .then(async verify => {
        if (verify && verify.userId) {
          await Promise.all([
            User.update({ isVerified: true }, { where: { id: verify.userId } }),
            VerificationCode.update({ isUsed: true }, { where: { id: verify.id } }),
          ]);
          res.render('static/successful.html', {
            title: 'Successful!',
            message: 'Thank you! Your account has been verified!',
          });
        } else {
          res.render('static/401.html');
        }
      })
      .catch(err => {
        logger.error(err);
        res.render('static/401.html');
      });
  }
  static async resetPassword(req, res) {
    const type = req.query._type;
    const code = req.query._code;
    if (type && code) {
      VerificationCode.findOne({
        attributes: ['id', 'userId'],
        where: {
          type,
          code,
          expiryDate: { [Op.gte]: Date.now() },
          isUsed: false,
        },
      })
        .then(async userDetail => {
          if (userDetail && userDetail.userId) {
            res.render('forms/reset-password.html', {
              userId: userDetail.userId,
              error: false,
              message: '',
              url: '/api/users/reset-password',
            });
          } else {
            res.render('static/401.html');
          }
        })
        .catch(err => {
          logger.error(err);
          res.render('static/401.html');
        });
    } else {
      res.render('static/401.html');
    }
  }
  static async resetPasswordPost(req, res) {
    const { userId, password, confirmPassword } = req.body;
    if (userId && password && confirmPassword && password === confirmPassword) {
      const newPass = hashSync(password);
      await Promise.all([
        VerificationCode.update({ isUsed: true }, { where: { userId, type: VERIFICATION_CODE_TYPES.FORGOT_PASSWORD } }),
        User.update({ password: newPass }, { where: { id: userId, type: TYPE } }),
      ]);
      res.render('static/successful.html', {
        title: 'Successful!',
        message: 'You have successfully reset your password. Try login now!',
      });
    } else {
      res.render('forms/reset-password.html', {
        userId: userId,
        error: true,
        message: "Password doesn't match",
      });
    }
  }
}

module.exports = UserController;
