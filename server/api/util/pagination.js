/**
 * Get page number and page Size and returns limit and offset for that page.
 * @param page
 * @param size
 * @returns {{offset: number, limit: number}}
 */
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

/**
 * Get paging data list, page Number, limit and offset and returns totalItems, pageData, totalPages, currentPage, offset.
 * @param data
 * @param page
 * @param limit
 * @param offset
 * @returns {{totalItems, offset, totalPages: number, pageData, currentPage: number}}
 */
const getPagingData = (data, page, limit, offset) => {
  const { count: totalItems, rows: pageData } = data;
  const currentPage = page ? ++page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, pageData, totalPages, currentPage, offset };
};

module.exports = { getPagination, getPagingData };
