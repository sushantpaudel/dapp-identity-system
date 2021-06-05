const logger = require('../../config/logger');
const httpStatus = require('http-status');
const { respond } = require('../../util/response');
const { deleteItem } = require('../../config/delete');
const { getPagination, getPagingData } = require('../util/pagination');
const { Role, RoleAction, RoleMenuAction } = require('../../models');
const Op = require('sequelize').Op;

class RoleController {
  static async getAll(req, res) {
    const { pageNumber, pageSize, searchString } = req.query;
    const { limit, offset } = getPagination(pageNumber, pageSize);
    Role.findAndCountAll({
      where: {
        isDeleted: false,
        isAdmin: { [Op.not]: true },
        [Op.or]: [{ name: { [Op.startsWith]: `${searchString}` } }],
      },
      limit,
      offset,
      attributes: ['id', 'name'],
    })
      .then(async roles => {
        const paginatedRoles = await getPagingData(roles, pageNumber, limit, offset);
        respond(res, httpStatus.OK, 'Role Lists', paginatedRoles);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Server Error!!');
      });
  }
  static async getOne(req, res) {
    Role.hasMany(RoleAction);
    RoleAction.belongsTo(RoleMenuAction);
    Role.findOne({
      include: [
        {
          model: RoleAction,
          required: false,
          attributes: ['id', 'roleId', 'roleMenuActionId'],
          where: { isDeleted: false },
          include: [
            {
              model: RoleMenuAction,
              required: false,
              attributes: ['name', 'key', 'roleMenuId'],
            },
          ],
        },
      ],
      where: { id: req.params.id, isDeleted: false },
      attributes: ['id', 'name', 'isAdmin'],
    })
      .then(role => {
        respond(res, httpStatus.OK, 'Role Data', role);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Server Error!!');
      });
  }
  static async post(req, res) {
    const role = req.body;
    Role.create({
      name: role.name,
      createdBy: role.createdBy,
    })
      .then(role => {
        respond(res, httpStatus.OK, 'Role successfully Created', role);
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error in creating role');
      });
  }
  static async put(req, res) {
    const role = req.body;
    const roleActions = req.body.role_actions || [];
    await RoleAction.destroy({ where: { roleId: role.id } });
    Promise.all([
      Role.update({ name: role.name, editedBy: role.editedBy }, { where: { id: role.id } }),
      ...roleActions.map(roleAction => {
        return RoleAction.create({
          ...roleAction,
          createdBy: req.body.editedBy,
        });
      }),
    ])
      .then(_ => {
        respond(res, httpStatus.OK, 'Role successfully updated');
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error in updating role');
      });
  }
  static async delete(req, res) {
    deleteItem(Role, req.params.id, req.payload)
      .then(_ => {
        respond(res, httpStatus.OK, 'Role Successfully deleted');
      })
      .catch(err => {
        logger.error(err);
        respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error in deleting role');
      });
  }
}

module.exports = RoleController;
