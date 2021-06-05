import React from 'react';
import classnames from './Loading.module.css';
import { connect } from 'react-redux';

const Loading = props => {
  if (!props.loading) return null;
  return (
    <div className={classnames.loaderContainer}>
      <div className={classnames.loader}></div>
    </div>
  );
};

export default connect(state => ({
  loading: state.loading,
}))(Loading);
