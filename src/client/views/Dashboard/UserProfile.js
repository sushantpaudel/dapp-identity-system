import React, { useState, useEffect } from 'react';
import { Card, CardFooter, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import meta_routes from 'client/meta_routes';

const UserProfile = props => {
  const user = props.user;
  const userRewards = props.user.user_rewards || [];
  const [rewardPoints, setRewardPoints] = useState(0);
  useEffect(() => {
    let total = 0;
    userRewards.forEach(r => {
      total += r.points;
    });
    setRewardPoints(total);
  }, [props.user.user_rewards]);
  return (
    <Card className="user-profile">
      <CardBody>
        <div className="profile-img">
          <img src="/assets/images/user-icon.png"></img>
        </div>
        <h5 className="mt-3">
          Hello {user.firstName} {user.lastName} !
        </h5>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        {/* <button className="btn-border edit-btn" onClick={setEditModal}>
          Edit
        </button>
        <button className="btn-border">Change password</button> */}
        <Link to={meta_routes.order} className="btn-border">
          View Orders
        </Link>
      </CardBody>
      <CardFooter>
        <div className="reward-point">
          <span>
            <i className="fas fa-medal"></i>
          </span>
          <p>
            <span>{rewardPoints}</span>Reward Points
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
