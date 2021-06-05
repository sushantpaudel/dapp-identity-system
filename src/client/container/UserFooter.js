import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

const UserFooter = () => {
  return (
    <div className="footer-wrapper">
      <Container>Footer</Container>
    </div>
  );
};

export default connect(state => ({
  categories: state.categories,
}))(UserFooter);
