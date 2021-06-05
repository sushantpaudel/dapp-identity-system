import React from 'react';
import routes from 'admin/meta_routes';
import { t as MyTranslation } from 'i18n';
import _ from 'lodash';

export const MainNav = [
  {
    label: <MyTranslation>Dashboard</MyTranslation>,
    icon: 'fa fa-layer-group',
    to: `#${routes.home}`,
    // content: [
    //   {
    //     label: <MyTranslation>Tabs</MyTranslation>,
    //     to: "#/components/tabs",
    //   },
    // ],
  },
];

export const SettingsNav = [
  {
    label: <MyTranslation>Users</MyTranslation>,
    icon: 'fa fa-user',
    permission: 'user',
    content: [
      {
        label: <MyTranslation>User List</MyTranslation>,
        to: `#${routes.users}`,
      },
      {
        label: <MyTranslation>Add User</MyTranslation>,
        to: `#${routes.usersAdd}`,
      },
    ],
  },
  {
    label: <MyTranslation>Roles</MyTranslation>,
    icon: 'fa fa-cubes',
    permission: 'role',
    content: [
      {
        label: <MyTranslation>Role List</MyTranslation>,
        to: `#${routes.roles}`,
        permission: 'role.view',
      },
      {
        label: <MyTranslation>Add Role</MyTranslation>,
        to: `#${routes.rolesAdd}`,
        permission: 'role.add',
      },
    ],
  },
];

export const AdminNav = [
  {
    label: <MyTranslation>Create Reports</MyTranslation>,
    icon: 'fa fa-chart-pie',
    to: `#${routes.createReports}`,
    permission: 'isAdmin',
  },
  {
    label: <MyTranslation>File Dump</MyTranslation>,
    icon: 'fa fa-layer-group',
    to: `#${routes.fileDump}`,
    permission: 'isAdmin',
  },
];

const checkPermission = (item, permissions) => {
  if (permissions.isAdmin) return true;
  if (item.permission) {
    return _.get(permissions, item.permission);
  }
  console.log(item);
  return true;
};

export const generateNavItems = (navItems, permissions) => {
  const items = [];
  navItems.forEach(item => {
    if (item.content) {
      item.content = item.content.filter(i => {
        if (checkPermission(i, permissions)) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (checkPermission(item, permissions)) {
      items.push(item);
    }
  });
  return items;
};
