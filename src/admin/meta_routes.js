const adminRoutes = {
  home: '/admin',
  login: '/admin/login',
  // CHARTS
  createReports: '/admin/create-reports',
  // EXCEL DUMP
  fileDump: '/admin/dump',
  //  USERS
  users: '/admin/users',
  usersAdd: '/admin/users/add',
  usersEdit: '/admin/users/edit',
  usersView: '/admin/users/:id',
  //  ROLES
  roles: '/admin/roles',
  rolesAdd: '/admin/roles/add',
  rolesView: '/admin/roles/:id',
  rolesEdit: '/admin/roles/edit',
  // DIGITAL IDENTITY
  digitalIdentities: '/admin/digital-identity',
  digitalIdentityAdd: '/admin/digital-identity/add',
  digitalIdentityEdit: '/admin/digital-identity/edit',
  digitalIdentityView: '/admin/digital-identity/:id',
};

export default adminRoutes;
