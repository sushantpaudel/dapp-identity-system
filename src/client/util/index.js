import _ from 'lodash';

export const getValue = (array, itemId, key = 'name') => {
  const item = _.find(array, { id: Number(itemId) });
  if (item) {
    return item[key];
  } else {
    return '';
  }
};
