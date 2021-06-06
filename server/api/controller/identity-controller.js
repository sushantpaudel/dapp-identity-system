const logger = require('../../config/logger');
const { DigitalIdentity, sequelize } = require('../../models');
const { deleteItem } = require('../../config/delete');
const { respond } = require('../../util/response');
const httpStatus = require('http-status');
const DigitalIdentityContract = require('../../blockchain/helpers/digital-identity');
const blockchainUserObj = require('../../blockchain/helpers/blockchain-user');
const { getPagination, getPagingData } = require('../util/pagination');

const getIdentityPayload = digitalIdentity => {
  return {
    name: digitalIdentity.name,
    citizenshipNumber: digitalIdentity.citizenshipNumber,
    phoneNumber: digitalIdentity.phoneNumber,
    address: digitalIdentity.address,
  };
};
class IdentityController {
  static async getAll(req, res) {
    const { pageNumber, pageSize, searchString } = req.query;
    const { limit, offset } = getPagination(pageNumber, pageSize);
    DigitalIdentity.findAndCountAll({
      where: { isDeleted: false },
      attributes: {
        exclude: ['privateKey'],
      },
    })
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
    try {
      const digitalIdentity = await DigitalIdentity.findOne({
        raw: true,
        where: { id: req.params.id, isDeleted: false },
      });
      await DigitalIdentityContract.initContract(digitalIdentity.publicKey, digitalIdentity.privateKey);
      delete digitalIdentity.privateKey;
      const payload = await DigitalIdentityContract.retrieveIdentity();
      respond(res, httpStatus.OK, 'Successful!', {
        ...digitalIdentity,
        ...payload,
        payload,
      });
    } catch (err) {
      logger.error(err);
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
    }
  }
  static async post(req, res) {
    const digitalIdentity = req.body;
    const newAccount = await blockchainUserObj.addAccount();
    DigitalIdentity.create({
      publicKey: newAccount.address,
      privateKey: newAccount.privateKey,
      name: digitalIdentity.name,
      citizenshipNumber: digitalIdentity.citizenshipNumber,
    })
      .then(async () => {
        await DigitalIdentityContract.initContract(newAccount.address, newAccount.privateKey);
        const result = await DigitalIdentityContract.createIdentity(getIdentityPayload(digitalIdentity));
        return result;
      })
      .then(() => {
        respond(res, httpStatus.OK, 'Digital identity data added successfully!', digitalIdentity);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
      });
  }
  static async put(req, res) {
    const digitalIdentity = req.body;
    const digitalIdentityDb = await DigitalIdentity.findOne({
      where: { id: digitalIdentity.id },
      attributes: ['publicKey', 'privateKey'],
    });
    await DigitalIdentityContract.initContract(digitalIdentityDb.publicKey, digitalIdentityDb.privateKey);
    sequelize
      .transaction(async transaction => {
        await DigitalIdentity.update(digitalIdentity, {
          where: { id: digitalIdentity.id },
          transaction,
        });
        await DigitalIdentityContract.createIdentity(getIdentityPayload(digitalIdentity));
        respond(res, httpStatus.OK, 'Digital identity data updated successfully!');
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
