const logger = require('../../config/logger');
const { DigitalIdentity, sequelize } = require('../../models');
const { deleteItem } = require('../../config/delete');
const { respond } = require('../../util/response');
const httpStatus = require('http-status');
const digitalIdentity = require('../../blockchain/helpers/digital-identity');
const blockchainUser = require('../../blockchain/helpers/blockchain-user');
const { getPagination, getPagingData } = require('../util/pagination');

class IdentityController {
  static async getAll(req, res) {
    const { pageNumber, pageSize, searchString } = req.query;
    const { limit, offset } = getPagination(pageNumber, pageSize);
    DigitalIdentity.findAndCountAll({ where: { isDeleted: false } })
      .then(async digitalIdentities => {
        const paginatedData = await getPagingData(digitalIdentities, pageNumber, limit, offset);
        respond(res, httpStatus.OK, 'Successful!', paginatedData);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
      });
  }
  static async getOne(req, res) {
    DigitalIdentity.findOne({ where: { id: req.params.id, isDeleted: false } })
      .then(digitalIdentity => {
        respond(res, httpStatus.OK, 'Successful!', digitalIdentity);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
      });
  }
  static async post(req, res) {
    const digitalIdentity = req.body;
    const newAccount = await blockchainUser.addAccount();
    DigitalIdentity.create({
      publicKey: newAccount.address,
      privateKey: newAccount.privateKey,
      name: digitalIdentity.name,
      citizenshipNumber: digitalIdentity.citizenshipNumber,
    })
      .then(_ => {
        respond(res, httpStatus.OK, 'Successful!', digitalIdentity);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
      });
  }
  static async put(req, res) {
    const reportData = req.body;
    sequelize
      .transaction(async transaction => {
        const identity = await DigitalIdentity.update(reportData, { where: { id: reportData.id }, transaction });
        respond(res, httpStatus.OK, 'Report Data updated successfully!');
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
      });
  }
  static async delete(req, res) {
    deleteItem(DigitalIdentity, req.params.id, req.payload)
      .then(_ => {
        respond(res, httpStatus.OK, 'Deleted successfully!');
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
      });
  }
}

module.exports = IdentityController;
