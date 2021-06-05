import React from 'react';
import AdminLayout from './AdminLayout';
import { Provider } from 'react-redux';
import store from 'admin/redux';
import 'admin/assets/base.scss';

const MainAdminLayout = props => {
  return (
    <Provider store={store}>
      <AdminLayout {...props} />
    </Provider>
  );
};

export default MainAdminLayout;
