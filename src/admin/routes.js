import React from 'react';
import metaRoutes from 'admin/meta_routes';

const Dashboard = React.lazy(() => import('admin/views/Dashboard/Dashboard'));
const CreateReport = React.lazy(() => import('admin/views/CreateReport/ReportList'));
const FileDump = React.lazy(() => import('./views/FileDump'));

const Roles = React.lazy(() => import('admin/views/Roles/Roles'));
const AddRole = React.lazy(() => import('admin/views/Roles/AddRole'));
const EditRole = React.lazy(() => import('admin/views/Roles/EditRole'));
const ViewRole = React.lazy(() => import('admin/views/Roles/ViewRole'));

const Users = React.lazy(() => import('admin/views/Users/Users'));
const AddUsers = React.lazy(() => import('admin/views/Users/AddUser'));
const EditUsers = React.lazy(() => import('admin/views/Users/EditUser'));

const DigitalIdentities = React.lazy(() => import('admin/views/DigitalIdentity/DigitalIdentities'));
const AddDigitalIdentity = React.lazy(() => import('admin/views/DigitalIdentity/AddDigitalIdentity'));
const EditDigitalIdentity = React.lazy(() => import('admin/views/DigitalIdentity/EditDigitalIdentity'));

const exportRoutes = [
  { path: metaRoutes.home, exact: true, name: 'Dashboard', component: Dashboard },
  { path: metaRoutes.createReports, exact: true, name: 'Create Report', component: CreateReport, permission: 'isAdmin' },
  { path: metaRoutes.fileDump, exact: true, name: 'File Upload', component: FileDump, permission: 'other.fileDump' },
  { path: metaRoutes.roles, exact: true, name: 'Roles', component: Roles, permission: 'role.view' },
  { path: metaRoutes.rolesAdd, exact: true, name: 'Add Role', component: AddRole, permission: 'role.add' },
  { path: metaRoutes.rolesEdit, exact: true, name: 'Edit Role', component: EditRole, permission: 'role.edit' },
  { path: metaRoutes.rolesView, name: 'View Role', component: ViewRole, permission: 'role.view' },
  { path: metaRoutes.users, exact: true, name: 'Users', component: Users, permission: 'user.view' },
  { path: metaRoutes.usersAdd, exact: true, name: 'Add Users', component: AddUsers, permission: 'user.add' },
  { path: metaRoutes.usersEdit, exact: true, name: 'Edit Users', component: EditUsers, permission: 'user.edit' },
  { path: metaRoutes.digitalIdentities, exact: true, name: 'Digital Identities', component: DigitalIdentities, permission: 'digitalIdentity.view' },
  { path: metaRoutes.digitalIdentityAdd, exact: true, name: 'Add Digital Identity', component: AddDigitalIdentity, permission: 'digitalIdentity.add' },
  { path: metaRoutes.digitalIdentityEdit, exact: true, name: 'Edit Digital Identity', component: EditDigitalIdentity, permission: 'digitalIdentity.edit' },
];

export default exportRoutes;
