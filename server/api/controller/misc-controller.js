const logger = require('../../config/logger');
const { User, Role, RoleMenu, RoleMenuAction, Brand, Supplier, Category } = require('../../models');
const httpStatus = require('http-status');
const { createHierarchyFromArray } = require('../../util/array');
const { respond } = require('../../util/response');
const Op = require('sequelize').Op;

class MiscController {
  static async getAllUsersMeta(req, res) {
    const roles = await Role.findAll({
      where: { isDeleted: false },
      attributes: ['id', 'name'],
    });
    respond(res, httpStatus.OK, 'Successful!', { roles: roles || [] });
  }
  static async getAllRolesMeta(req, res) {
    RoleMenu.hasMany(RoleMenuAction);
    const [roleMenus] = await Promise.all([
      RoleMenu.findAll({
        where: { isDeleted: false },
        attributes: ['name'],
        include: [
          {
            model: RoleMenuAction,
            required: true,
            attributes: ['id', 'name'],
          },
        ],
        order: [[RoleMenuAction, 'name', 'ASC']],
      }),
    ]).catch(err => {
      logger.error(err);
    });
    respond(res, httpStatus.OK, 'Role Meta Lists', {
      roleMenus: roleMenus,
    });
  }
  static async getAllProductsMeta(req, res) {
    const [brands, suppliers, categories] = await Promise.all([
      Brand.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name'],
      }),
      Supplier.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name'],
      }),
      Category.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name', 'level', 'parentId'],
      }),
    ]).catch(err => {
      logger.error(err);
    });
    respond(res, httpStatus.OK, 'Successful!', {
      brands: brands || [],
      suppliers: suppliers || [],
      categories: createHierarchyFromArray(categories) || [],
    });
  }
  static async getAllOrderMeta(req, res) {
    const users = await User.findAll({
      where: { isDeleted: false, type: 'admin', username: { [Op.not]: 'superadmin' } },
      attributes: ['id', 'firstName', 'lastName'],
    });
    respond(res, httpStatus.OK, 'Successful!', { users: users || [] });
  }
}

module.exports = MiscController;
