import http from '../http-common';

const getAll = (page, sort) => {
  return http.get(`/products?_page=${page}&_limit=20&_sort=${sort}`)
}

export default { getAll };
