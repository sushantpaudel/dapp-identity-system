require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING,
  },
  test: {
    database: process.env.STAGING_DB_NAME,
    username: process.env.STAGING_DB_USERNAME,
    password: process.env.STAGING_DB_PASSWORD,
    host: process.env.STAGING_DB_HOST,
    dialect: process.env.STAGING_DB_DIALECT,
    logging: false,
  },
  production: {
    database: process.env.PRODUCTION_DB_NAME,
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    host: process.env.PRODUCTION_DB_HOST,
    dialect: process.env.PRODUCTION_DB_DIALECT,
    logging: false,
  },
};
