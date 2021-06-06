import { server } from 'admin/server';
const url = '/digital-identity';

const getDigitalIdentities = params => {
  return server
    .get(`${url}`, { params })
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const getDigitalIdentity = id => {
  return server
    .get(`${url}/${id}`)
    .then(json => json.data)
    .catch(err => {
      return err.response.data;
    });
};

const editDigitalIdentity = user => {
  return server
    .put(`${url}`, user)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const addDigitalIdentity = user => {
  return server
    .post(`${url}`, user)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

const deleteDigitalIdentity = id => {
  return server
    .delete(`${url}/${id}`)
    .then(res => res.data)
    .catch(err => {
      return err.response.data;
    });
};

export { getDigitalIdentities, getDigitalIdentity, editDigitalIdentity, addDigitalIdentity, deleteDigitalIdentity };
