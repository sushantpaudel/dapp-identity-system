import { server } from 'admin/server';

export const getReports = async () => {
  return server
    .get(`/dashboard/reports`)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return {};
    });
};
