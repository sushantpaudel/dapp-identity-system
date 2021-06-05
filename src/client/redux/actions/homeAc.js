import { server } from 'client/server';

export const getAll = () => {
  return () =>
    server
      .get('/all')
      .then(res => res.data)
      .then(() => {})
      .catch(err => console.log(err));
};
