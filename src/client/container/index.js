import React from 'react';
import UserLayout from './UserLayout';
import { Provider } from 'react-redux';
import store from 'client/redux';

const MainUserLayout = props => {
  return (
    <Provider store={store}>
      <UserLayout {...props} />
    </Provider>
  );
};

export default MainUserLayout;
