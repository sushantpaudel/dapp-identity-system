import A from '../actions';

const authUser = (state = { isLoading: true }, { type, payload }) => {
  switch (type) {
    case A.SET_AUTH_USER:
      return {
        ...payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const myProfile = (state = { isLoading: true }, { type, payload }) => {
  switch (type) {
    case A.SET_PROFILE:
      return {
        ...payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default {
  authUser,
  myProfile,
};
