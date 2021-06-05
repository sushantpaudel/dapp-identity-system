import { server } from 'admin/server';
const url = '/create-report';

export const getReports = async () => {
  return server
    .get(url)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return {};
    });
};

export const getReport = async id => {
  return server
    .get(`${url}/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return {};
    });
};

export const addReport = async data => {
  return server
    .post(url, data)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return {};
    });
};

export const editReport = async data => {
  return server
    .put(url, data)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return {};
    });
};
