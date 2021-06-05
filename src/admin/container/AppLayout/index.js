import React, { Suspense, useEffect } from 'react';
import routes from 'admin/routes';
import { authorize } from 'admin/redux/actions/authAction';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'admin/_authorize';
import Login from '../AdminLogin';
import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import AppLoading from '../AppLoading';
// import "admin/admin.scss";

const AdminLayout = props => {
  const loading = () => {
    return (
      <div className="loader-container">
        <div className="loader-container-inner">
          <h6 className="mt-3">
            Please wait while we are loading...
            {/* <small>
              Because this is a demonstration we load at once all the Components
              examples. This wouldn't happen in a real live app!
            </small> */}
          </h6>
        </div>
      </div>
    );
  };

  useEffect(() => {
    props.dispatch(authorize());
  }, []); //eslint-disable-line

  if (!props.authUser.isAuthenticated) {
    if (props.authUser.isLoading) return null;
    else return <Login />;
  }

  if (props.permissions.isLoading) return null;

  return (
    <React.Fragment>
      <AppHeader />
      <AppLoading />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => (
                  <PrivateRoute {...route} key={idx} />
                ))}
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(state => ({
  authUser: state.authUser,
  permissions: state.permissions,
}))(AdminLayout);
