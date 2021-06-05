import { server } from 'admin/server';

const url = '/file-parser';

const uploadFile = async (file, option) => {
  return server
    .post(`${url}/${option}`, file)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const getFileMeta = async () => {
  return server
    .get(`${url}/meta`)
    .then(res => res.data)
    .catch(err => err.response.data);
};

export { uploadFile, getFileMeta };
