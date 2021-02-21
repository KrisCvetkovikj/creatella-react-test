import http from '../http-common';

const getAll = () => {
  return http.get('/products')
}


/*
const get = (id) =>
{
  return http.get(`//${id}`)
}

create(data)
{
  return http.post('/items', data)
}

update(id, data)
{
  return http.put(`/items/${id}`, data)
}

delete (id)
{
  return http.delete(`/items/${id}`)
}

deleteAll()
{
  return http.delete('/items')
}

findByTitle(title)
{
  return http.get(`/items?title=${title}`)
}*/

export default {
  getAll
};
