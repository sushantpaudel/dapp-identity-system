const nodemailer = require('nodemailer');
const logger = require('./logger');
const { EMAIL } = require('./credentials');
const { readEmail } = require('../email');

const emailTransporter = nodemailer.createTransport({
  host: EMAIL.HOST,
  port: EMAIL.PORT,
  secure: EMAIL.SECURE,
  auth: {
    user: EMAIL.USERNAME, // generated ethereal user
    pass: EMAIL.PASSWORD, // generated ethereal password
  },
});

module.exports.transporter = emailTransporter;

/**
 *
 * @param {String} to - Email Address
 * @param {String} subject - Subject to send email
 * @param {Object} payload - Payload containing the variables to update in the template before sending email
 * @param {String} templatePath - Path to the template excluding email/templates
 * @param {String} text - Text portion to the email
 * @returns
 */
module.exports.sendMessage = async (to, subject, payload, templatePath, text = ``) => {
  const html = readEmail(templatePath, payload);
  return emailTransporter
    .sendMail({
      from: '"Organization " <noreply@oasys.com.np>', // sender address
      to,
      subject,
      text,
      html,
    })
    .then(info => {
      if (info.rejected.length) {
        logger.error(info.rejected);
      }
      return info;
    })
    .catch(err => {
      logger.error(err);
    });
};
