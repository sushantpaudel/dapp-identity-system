import { server } from 'admin/server';
import A from '.';

export const getAllMeta = async url => {
  return server
    .get(`/all/${url}`)
    .then(res => res.data)
    .catch(err => err.response.data);
};
export const setLoading = payload => ({
  type: A.SET_LOADING,
  payload: payload,
});
