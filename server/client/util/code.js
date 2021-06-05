const crypto = require('crypto');
const { VerificationCode } = require('../../models');
const logger = require('../../config/logger');
const { sendMessage } = require('../../config/email');
const { VERIFICATION_CODE_TYPES } = require('../../util/values');

module.exports.sendConfirmationByEmail = async (user, apiUrl) => {
  const COMPANY_NAME = `Oasys I.T. Solutions`;
  const email = user.email;
  const code = crypto.randomBytes(20).toString('hex');
  const nonce = crypto.randomBytes(10).toString('hex');
  const url = `${apiUrl}store/users/verify?_key=${nonce}&_type=${VERIFICATION_CODE_TYPES.EMAIL_VERIFICATION}&_code=${code}`;
  await VerificationCode.create({
    email: user.email,
    userId: user.id,
    type: VERIFICATION_CODE_TYPES.EMAIL_VERIFICATION,
    code: code,
    expiryDate: Date.now() + 100 * 60 * 1000, //100 minutes
  });
  const success = await sendMessage(
    email,
    `Verification Email`,
    {
      EMAIL_ADDRESS: email,
      VERIFICATION_URL: url,
      COMPANY_NAME: COMPANY_NAME,
    },
    'verification-email.html',
  ).catch(err => logger.error(err));
  return success
    ? { success: true, message: 'Email sent' }
    : { success: false, message: 'Email not sent. Please try again later.' };
};

module.exports.forgotPassword = async (user, apiUrl) => {
  const COMPANY_NAME = `Oasys I.T. Solutions`;
  const email = user.email;
  const code = crypto.randomBytes(20).toString('hex');
  const nonce = crypto.randomBytes(10).toString('hex');
  const url = `${apiUrl}store/users/reset-password?_key=${nonce}&_type=${VERIFICATION_CODE_TYPES.FORGOT_PASSWORD}&_code=${code}`;
  await VerificationCode.create({
    email: user.email,
    userId: user.id,
    type: VERIFICATION_CODE_TYPES.FORGOT_PASSWORD,
    code: code,
    expiryDate: Date.now() + 12 * 60 * 60 * 1000, // 12 hrs
  });
  const success = await sendMessage(
    email,
    `Password Reset Email`,
    {
      EMAIL_ADDRESS: email,
      PASSWORD_RESET_URL: url,
      COMPANY_NAME: COMPANY_NAME,
    },
    'verification-email.html',
  ).catch(err => logger.error(err));
  return success
    ? { success: true, message: 'Email sent' }
    : { success: false, message: 'Email not sent. Please try again later.' };
};
