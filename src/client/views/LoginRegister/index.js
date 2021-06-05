import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import metaRoutes from 'client/meta_routes';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';

const LoginRegister = props => {
  const [isLogin, setIsLogin] = useState(true);
  if (!props.authUser.isLoading && props.authUser.isAuthenticated) {
    return <Redirect to={metaRoutes.dashboard} />;
  }
  return (
    <div className="login-register">
      <Row>
        <Col md={6} className="p-5">
          {!isLogin && (
            <div className="login-overlay">
              <img src="./assets/images/login-bg.svg"></img>
              <p className="mb-0 mt-5">Already have an account?</p>
              <Button onClick={() => setIsLogin(true)}>Login here</Button>
            </div>
          )}
          <Login />
        </Col>
        <Col md={6} className="p-5">
          {isLogin && (
            <div className="register-overlay">
              <img src="./assets/images/login-bg.svg"></img>
              <p className="mb-0 mt-5">Don&apos;t have an account?</p>
              <Button onClick={() => setIsLogin(false)}>Register here</Button>
            </div>
          )}
          <Register />
        </Col>
      </Row>
    </div>
  );
};

export default connect(state => ({
  authUser: state.authUser,
}))(LoginRegister);
