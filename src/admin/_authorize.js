import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

const PrivateRoute = props => {
  const permissions = props.permissions || {};
  const permission = props.permission || '';
  const isAccessible = props.permission ? permissions.isAdmin || _.get(permissions, permission) : true;
  if (isAccessible) {
    return (
      <Route
        key={props.key}
        exact={props.exact}
        path={props.path}
        render={prop => <props.component {...props} {...prop} />}
      />
    );
  } else {
    return <Redirect to="/401" />;
  }
};

export default connect(state => ({
  authUser: state.authUser,
  permissions: state.permissions,
}))(PrivateRoute);
