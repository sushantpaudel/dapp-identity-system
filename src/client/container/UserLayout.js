import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';
import { authorize } from 'client/redux/actions/accountAc';
import routes from 'client/routes';
import 'client/store.scss';
import { getAll } from 'client/redux/actions/homeAc';

const loading = () => {
  return <h3>This is loading...</h3>;
};

const UserLayout = props => {
  useEffect(() => {
    props.dispatch(authorize());
    props.dispatch(getAll());
  }, [props.authUser.isAuthenticated]); //eslint-disable-line
  return (
    <div className="store-app">
      <UserNavbar {...props} />
      <Container>
        <Suspense fallback={loading()}>
          <Switch>
            {routes.map((route, i) => (
              <Route {...route} key={i} />
            ))}
          </Switch>
        </Suspense>
      </Container>
      <UserFooter />
    </div>
  );
};

export default connect(state => ({ authUser: state.authUser }))(UserLayout);
