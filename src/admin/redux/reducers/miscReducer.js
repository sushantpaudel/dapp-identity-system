import A from '../actions';

const loading = (state = false, { type, payload }) => {
  switch (type) {
    case A.SET_LOADING:
      return payload;
    default:
      return state;
  }
};

export default {
  loading,
};
