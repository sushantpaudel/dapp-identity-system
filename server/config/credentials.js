const dotenv = require('dotenv');
dotenv.config();

module.exports.EMAIL = {
  HOST: process.env.EMAIL_HOST,
  PORT: process.env.EMAIL_PORT,
  USERNAME: process.env.EMAIL_USERNAME,
  PASSWORD: process.env.EMAIL_PASSWORD,
  SECURE: process.env.EMAIL_SECURE,
};

module.exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports.HTTP_SECURE = process.env.HTTP_SECURE === 'true';

module.exports.ESEWA = {
  MERCHANT_CODE: process.env.ESEWA_MERCHANT_CODE || 'epay_payment',
  VERIFY_TRANSREC_URL: process.env.ESEWA_VERIFY_TRANSREC_URL || 'https://uat.esewa.com.np/epay/transrec',
};

module.exports.SERVER_PORT = process.env.SERVER_PORT;
module.exports.HEROKU_SERVER = process.env.HEROKU_SERVER;

module.exports.BLOCKCHAIN = {
  ADDRESS: process.env.BLOCKCHAIN_ADDRESS,
  PRIVATE_KEY: process.env.BLOCKCHAIN_PRIVATE_KEY,
  INFURA_URL: process.env.BLOCKCHAIN_INFURA_URL,
  IPFS_HOST: process.env.BLOCKCHAIN_IPFS_HOST,
  IPFS_PORT: process.env.BLOCKCHAIN_IPFS_PORT,
  IPFS_PROTOCOL: process.env.BLOCKCHAIN_IPFS_PROTOCOL,
};
