const { Role, RoleAction, RoleMenu, RoleMenuAction } = require('../../models');
const _ = require('lodash');

/**
 * @param {Array<Number>} roleIds - Arrays of Role Id
 * @returns - Object with the required permissions
 */
const getPermissions = async roleIds => {
  if (!roleIds) return {};
  const permissions = {};
  Role.hasMany(RoleAction);
  RoleAction.belongsTo(RoleMenuAction);
  RoleMenuAction.hasOne(RoleMenu, {
    sourceKey: 'roleMenuId',
    foreignKey: 'id',
  });
  const roles = await Promise.all(
    roleIds.map(id =>
      Role.findOne({
        where: { id: id },
        attributes: ['id', 'isAdmin'],
        include: [
          {
            model: RoleAction,
            required: false,
            attributes: ['id'],
            include: [
              {
                model: RoleMenuAction,
                required: true,
                attributes: [['key', 'actionKey']],
                include: [{ model: RoleMenu, attributes: [['key', 'menuKey']] }],
              },
            ],
          },
        ],
      }),
    ),
  );
  roles.forEach(role => {
    permissions.isAdmin = permissions.isAdmin || role.isAdmin;
    if (role) {
      for (action of role.role_actions) {
        const actionKey = action.role_menu_action.dataValues.actionKey;
        const menuKey = action.role_menu_action.role_menu.dataValues.menuKey;
        if (permissions[menuKey]) {
          permissions[menuKey] = {
            ...permissions[menuKey],
            [actionKey]: true,
          };
        } else {
          permissions[menuKey] = {
            [actionKey]: true,
          };
        }
      }
    }
  });
  return permissions;
};

const authorizeRole = permission => async (req, res, next) => {
  const permissions = await getPermissions(req.payload.roleIds);
  const isAccessible = permissions.isAdmin || _.get(permissions, permission);
  if (isAccessible) {
    next();
  } else {
    res.status(401).send(`You do not have access to enter this site`);
  }
};

module.exports.getPermissions = getPermissions;
module.exports.authorizeRole = authorizeRole;
