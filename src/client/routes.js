import React from 'react';
import metaRoutes from 'client/meta_routes';

const Home = React.lazy(() => import('client/views/Home'));
const LoginRegister = React.lazy(() => import('client/views/LoginRegister'));
const Dashboard = React.lazy(() => import('client/views/Dashboard/Dashboard'));

const exportRoutes = [
  { path: metaRoutes.home, exact: true, component: Home },
  { path: metaRoutes.login, exact: true, component: LoginRegister },
  { path: metaRoutes.dashboard, exact: true, component: Dashboard },
];

export default exportRoutes;
