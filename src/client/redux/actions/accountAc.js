import A from '.';
import { USER_TOKEN } from 'config/values';
import { server } from 'client/server';
import { toast } from 'react-toastify';

export const signIn = ({ username, password }) => {
  return dispatch =>
    server
      .post('/login', { username, password })
      .then(res => res.data)
      .then(data => {
        dispatch(setAuthUser(data.user));
        localStorage.setItem(USER_TOKEN, data.user.token);
      })
      .catch(() => {
        toast.warn('Invalid username or password');
      });
};

export const registerAccount = async user => {
  return server.post('/users/register', user).then(res => res.data);
};

export const logout = () => {
  localStorage.removeItem(USER_TOKEN);
  localStorage.removeItem(A.SET_CART_LIST);
  window.location.reload();
};

export const authorize = () => {
  return dispatch => {
    return server
      .get('/authorize')
      .then(res => {
        const data = res.data;
        return { ...(data ? data.user : {}) };
      })
      .then(user => {
        dispatch(setAuthUser(user));
      })
      .catch(() => {});
  };
};

export const getMyProfile = () => {
  return dispatch =>
    server
      .get('/my-profile')
      .then(res => {
        return res.data;
      })
      .then(user => {
        dispatch(setProfile(user));
      })
      .catch(() => {});
};

export const deleteAddress = id => {
  return dispatch =>
    server
      .delete(`/user-address/${id}`)
      .then(res => {
        return res.data;
      })
      .then(() => {
        dispatch(getMyProfile());
      })
      .catch(() => {});
};

const setAuthUser = payload => {
  return { type: A.SET_AUTH_USER, payload: payload };
};
const setProfile = payload => {
  return { type: A.SET_PROFILE, payload: payload };
};
