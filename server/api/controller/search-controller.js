const { Supplier, Product, User, Category, ProductCategory, ProductBatch } = require('../../models');
const httpStatus = require('http-status');
const { respond } = require('../../util/response');
const Op = require('sequelize').Op;

const searchData = (Modal, searchString, keys, attributes, includes = []) => {
  return Modal.findAll({
    attributes: attributes,
    where: {
      isDeleted: false,
      [Op.or]: keys.map(key => ({ [key]: { [Op.startsWith]: searchString } })),
    },
    limit: 15,
    include: includes,
  });
};
class SearchController {
  static async searchSuppliers(req, res) {
    const { searchString } = req.query;
    const data = await searchData(
      Supplier,
      searchString || '',
      ['name', 'description', 'phoneNumber'],
      ['id', 'name', 'phoneNumber', 'email'],
    );
    respond(res, httpStatus.OK, 'Successful!', data);
  }
  static async searchProducts(req, res) {
    const { searchString } = req.query;
    Product.hasMany(ProductCategory);
    ProductCategory.belongsTo(Category);
    Product.hasMany(ProductBatch);
    const data = await searchData(
      Product,
      searchString || '',
      ['name', 'description'],
      ['id', 'name', 'vatPercentage', 'isVatApplicable', 'costPrice', 'markedPrice', 'brandId', 'supplierId'],
      [
        { model: ProductCategory, attributes: ['categoryId'], include: [{ model: Category, attributes: ['name'] }] },
        { model: ProductBatch, required: true, attributes: [] },
      ],
    );
    respond(res, httpStatus.OK, 'Successful!', data);
  }
  static async searchUsers(req, res) {
    const { searchString } = req.query;
    const data = await searchData(
      User,
      searchString || '',
      ['name', 'description', 'phoneNumber'],
      ['username', 'email', 'firstName', 'lastName'],
    );
    respond(res, httpStatus.OK, 'Successful!', data);
  }
}

module.exports = SearchController;
