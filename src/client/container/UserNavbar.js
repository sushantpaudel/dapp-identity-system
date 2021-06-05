import React from 'react';
import { Link } from 'react-router-dom';
import metaRoutes from 'client/meta_routes';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { logout } from 'client/redux/actions/accountAc';

const UserNavbar = props => {
  return (
    <div className="header-wrapper">
      <div className="top-header">
        <Container>
          {props.authUser.isAuthenticated ? (
            <div>
              <Link className="mr-3" to={metaRoutes.dashboard}>
                <i className="far fa-user mr-1"></i> Account
              </Link>
              <Link to={metaRoutes.home} onClick={() => logout()}>
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </Link>
            </div>
          ) : (
            <Link to={metaRoutes.login}>
              <i className="far fa-user mr-1"></i> Signin / Signup
            </Link>
          )}
        </Container>
      </div>
    </div>
  );
};

export default connect(state => ({
  authUser: state.authUser,
}))(UserNavbar);
