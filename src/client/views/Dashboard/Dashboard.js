import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import meta_routes from 'client/meta_routes';
import './Dashboard.scss';
import { Row, Col } from 'reactstrap';
import UserProfile from './UserProfile';
import { getMyProfile } from 'client/redux/actions/accountAc';

const Dashboard = props => {
  useEffect(() => {
    props.dispatch(getMyProfile());
  }, []);
  if (props.authUser.isLoading) {
    return null;
  }
  if (!props.authUser.isAuthenticated) {
    return <Redirect to={meta_routes.login} />;
  }
  return (
    <div className="dashboard">
      <h2 className="mb-3">My Account</h2>
      <Row>
        <Col md="4">
          <UserProfile user={props.myProfile} />
        </Col>
      </Row>
    </div>
  );
};
export default connect(state => ({
  authUser: state.authUser,
  myProfile: state.myProfile,
}))(Dashboard);
