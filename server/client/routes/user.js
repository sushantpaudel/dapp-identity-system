const router = require('express').Router();
const logger = require('../../config/logger');
const auth = require('../../config/auth');
const { User, VerificationCode, UserAddress } = require('../../models');
const { hashSync } = require('../../util/jwt');
const { sendConfirmationByEmail, forgotPassword } = require('../util/code');
const Op = require('sequelize').Op;
const { VERIFICATION_CODE_TYPES } = require('../../util/values');
const TYPE = 'customer';

router.post('/users/register', (req, res, next) => {
  const user = req.body;
  user.type = 'customer';
  user.password = hashSync(user.password);
  User.create(user)
    .then(user => {
      res.send({
        success: true,
        message: 'User successfully created! Verify your email',
      });
      sendConfirmationByEmail({ id: user.id, email: user.email }, req.apiUrl).catch(err => logger.error(err));
    })
    .catch(err => {
      logger.error(err);
      if (err.original.code === 'ER_DUP_ENTRY') {
        res.send({ message: err.original.sqlMessage.replace('users.', '') });
      } else {
        res.send({ message: 'Error in creating user' });
      }
    });
});

router.get('/users/verify', async (req, res, next) => {
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
        res.send('Thank you! Your account has been verified!');
      } else {
        res.send('Verification link is either expired or is already used!');
      }
    })
    .catch(err => {
      logger.error(err);
      res.send('Verification of the account could not be completed!');
    });
});

router.post('/users/forgot-password', async (req, res, next) => {
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
    res.status(500).send({ success: false, message: 'User not found!!' });
  } else {
    forgotPassword({ email: isUser.email, id: isUser.id }, req.apiUrl)
      .then(_ => {
        res.json({
          success: true,
          message: 'Email sent. Please check your email.',
        });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send({
          success: false,
          message: 'Error!!',
        });
      });
  }
});

router.get('/users/reset-password', async (req, res, next) => {
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
            url: '/store/users/reset-password',
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
});

router.post('/users/reset-password', async (req, res, next) => {
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
});

router.put('/users', auth.customer, (req, res, next) => {
  const user = req.body;
  const userDetail = {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth,
    editedBy: req.payload.id,
  };
  User.update({ ...userDetail, type: 'customer' }, { where: { id: req.payload.id } })
    .then(_ => {
      res.send({ success: true, message: 'User Detail updated successfully.' });
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send({ success: false, message: 'Error!!' });
    });
});

module.exports = router;
