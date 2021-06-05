import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from 'admin/container';
// import UserLayout from "client/container";
import Page401 from 'pages/401';
import Page404 from 'pages/404';
import Page500 from 'pages/500';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/401" component={Page401} />
      <Route path="/404" component={Page404} />
      <Route path="/500" component={Page500} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      {/* <Route path="/" render={(props) => <UserLayout {...props} />} /> */}
      <Redirect to="/admin" />
    </Switch>
  );
};

export default AppRoutes;
