const router = require('express').Router();
const { User, Role, RoleMenu, RoleMenuAction, UserRole } = require('../models');
const { createDirectories } = require('./filesystem');
const { users, roles, roleMenus } = require('./setup.json');

router.get('/', async (_, res) => {
  createDirectories();
  /**
   * **Todo**
   * This condition to setup only if the user is not available should be removed.
   * And we can setup everytime.
   */
  await Promise.all([
    ...roleMenus.map(async menu => {
      // Check if Role menu exists
      let dbMenu = await RoleMenu.findOne({ where: { key: menu.key } });
      if (!dbMenu) {
        // If it does not exist then create one
        dbMenu = await RoleMenu.create(menu);
      }
      if (menu.actions) {
        menu.actions.map(async action => {
          // Check if Role menu action exists
          const dbAction = await RoleMenuAction.findOne({
            where: { key: action.key, roleMenuId: dbMenu.id },
          });
          if (!dbAction) {
            // If it does not exist then create one
            return RoleMenuAction.create({
              ...action,
              roleMenuId: dbMenu.id,
            });
          }
        });
      }
    }),
    // Need to be checked **name**
    ...roles.map(async role => {
      // Check if Role exists
      let checkRole = await Role.findOne({ where: { name: role.name } });
      if (!checkRole) {
        return Role.create(role);
      }
    }),
    // Need to be checked **username**
    ...users.map(async user => {
      // Check if user exists
      let checkUser = await User.findOne({
        where: { username: user.username },
      });
      if (!checkUser) {
        // If user doesn't exist create one
        checkUser = await User.create(user);
      }
      if (user.roles) {
        // If user has role, find detail of that user
        user.roles &&
          Promise.all(
            user.roles.map(name =>
              // Check if that role exists, if so check if that role exists for created userId or not.
              Role.findOne({ where: { name: name } }).then(async role => {
                let checkUserRole = await UserRole.findOne({
                  where: { userId: checkUser.id, roleId: role.id },
                  attributes: ['userId', 'roleId'],
                });
                // If role not existed for created user then create one.
                if (!checkUserRole) {
                  UserRole.create({ roleId: role.id, userId: checkUser.id });
                }
              }),
            ),
          );
      }
    }),
  ])
    .then(_ => {
      res.send(`
            <h1>Setup completed</h1>
            <br/>
            <h2>Username: admin</h2>
            <h2>Password: admin123</h2>
        `);
    })
    .catch(err => {
      console.log(err);
      res.send(`
            <h1>Setup already completed</h1>
            <br/>
            <h2>Username: admin</h2>
            <h2>Password: admin123</h2>
        `);
    });
});

module.exports = router;
