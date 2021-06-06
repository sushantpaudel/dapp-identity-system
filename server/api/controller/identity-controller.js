const logger = require('../../config/logger');
const { deleteItem } = require('../../config/delete');
const { respond } = require('../../util/response');
const httpStatus = require('http-status');
const digitalIdentity = require('../../blockchain/helpers/digital-identity');

class IdentityController {
  static async getAll(req, res) {
    await digitalIdentity.createIdentity({
      name: 'Sushant Paudel',
      citizenshipNo: '46-01-69-02317',
      address: 'Pokhara, Nepal',
    });
    respond(res, httpStatus.OK, 'Successful!');
  }
  static async getOne(req, res) {
    respond(res, httpStatus.OK, 'Successful!');
  }
  static async post(req, res) {
    respond(res, httpStatus.OK, 'Successful!');
  }
  static async put(req, res) {
    respond(res, httpStatus.OK, 'Successful!');
  }
  static async delete(req, res) {
    respond(res, httpStatus.OK, 'Successful!');
  }
}

module.exports = IdentityController;
