const { readEmail } = require('../email');

module.exports.verificationEmailTemplate = (emailAddress, url) => {
  const html = readEmail('verification-email', {
    EMAIL_ADDRESS: emailAddress,
    VERIFICATION_URL: url,
    COMPANY_NAME: 'Oasys I.T. Solutions',
  });
  return {
    to: emailAddress,
    subject: 'User verification',
    text: '',
    html: html,
  };
};

module.exports.forgotPasswordEmailTemplate = (emailAddress, url) => {
  const html = readEmail('verification-email', {
    EMAIL_ADDRESS: emailAddress,
    PASSWORD_RESET_URL: url,
    COMPANY_NAME: 'Oasys I.T. Solutions',
  });
  return {
    to: emailAddress,
    subject: 'User verification',
    text: '',
    html: html,
  };
};
