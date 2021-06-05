import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import classes from './loading.module.css';

const AppLoading = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className={classes.main}>
      <Spinner color="success" />
      {/* <div className={classes.bar}>
        <span />
        <span />
        <span />
        <span />
      </div> */}
    </div>
  );
};

export default connect(state => ({
  loading: state.loading,
}))(AppLoading);
